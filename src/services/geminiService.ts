import { getSystemPromptForModule } from "../constants";
import { UserProfile, AppMode, Message } from "../types";

// Apunta al proxy seguro de Vercel — la API key nunca sale del servidor
const API_URL = '/api/chat';

// Variables persistentes en memoria para manejar la sesión de Claude
let currentSystemPrompt: string = "";
let conversationHistory: { role: 'user' | 'assistant', content: string }[] = [];

/**
 * Determina el módulo activo basado en XP y módulos completados
 */
export const getActiveModuleId = (user: UserProfile): number => {
  if (!user.completedModules.includes(0)) return 0;
  const completed = [...user.completedModules].sort((a, b) => b - a);
  const highestCompleted = completed[0] ?? 0;
  return Math.max(1, highestCompleted + 1 <= 19 ? highestCompleted + 1 : highestCompleted);
};

/**
 * Inicializa la sesión de chat configurando el system prompt y el historial
 */
export const initializeChat = async (
  user: UserProfile,
  previousMessages: Message[] = [],
  activeModuleId?: number
) => {
  const moduleId = activeModuleId ?? getActiveModuleId(user);
  const baseSystemPrompt = getSystemPromptForModule(moduleId);

  // Cargar historial en el formato de Claude
  conversationHistory = previousMessages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));

  const hasHistory = conversationHistory.length > 0;
  let specificInstruction = "";

  if (!hasHistory) {
    if (moduleId === 1) {
      specificInstruction = `
**ESTADO ACTUAL:** El estudiante ACABA de iniciar el Módulo 1 por primera vez.

**TU PRIMERA ACCIÓN (OBLIGATORIA):**
1. Bienvenida breve y motivadora: "¡Bienvenido a bordo, ${user.name}! 🚀 Módulo 1 activado oficialmente."
2. Contexto del dilema central del módulo: En el ecosistema farmacéutico ecuatoriano existe una pregunta estratégica que divide a los visitadores novatos: ¿Dónde concentrar la energía — en el sector público (MSP/IESS, 68% de la población) o en el sector privado (más ágil y personalizado)?
3. Pregunta de activación: "Antes de entrar a la teoría: ¿cuál es tu intuición inicial? ¿Dónde crees que debería enfocarse un visitador nuevo en Ecuador — en la escala del sector público o en la agilidad del privado? ¿Por qué?"

NOTA: NO preguntes "¿en qué te ayudo?". TOMA LA INICIATIVA con el dilema estratégico del módulo.
      `;
    } else {
      specificInstruction = `
**ESTADO ACTUAL:** El estudiante está iniciando el Módulo ${moduleId} por primera vez.

**TU PRIMERA ACCIÓN (OBLIGATORIA):**
1. Bienvenida al módulo: Indica el nombre del módulo y felicita al estudiante por haber llegado hasta aquí.
2. Resumen de lo que aprenderá en este módulo (3 puntos clave).
3. Pregunta diagnóstica de nivel: Haz la pregunta de detección de nivel específica de este módulo.
      `;
    }
  } else {
    specificInstruction = `
**ESTADO ACTUAL:** Conversación en curso en el Módulo ${moduleId}.
**REGLAS DE CONTINUIDAD:** Coherencia total con el historial, refuerzo positivo variado y flujo natural hacia el siguiente concepto.
    `;
  }

  // Construir el system prompt personalizado completo
  currentSystemPrompt = `
${baseSystemPrompt}

**PERFIL DEL ESTUDIANTE:**
- Nombre: ${user.name}
- Nivel declarado: ${user.level}
- XP actual: ${user.xp} (Rango: ${user.rank})
- Módulo activo: ${moduleId}

${specificInstruction}
  `;

  return true;
};

/**
 * Envía un mensaje a través del proxy seguro de Vercel hacia Claude.
 * Se mantiene el nombre sendMessageToGemini para no romper importaciones existentes.
 */
export const sendMessageToGemini = async (
  text: string,
  currentMode: AppMode
): Promise<string> => {

  // Añadir contexto del modo activo al mensaje y guardar en historial
  const contextualizedMessage = `[MODO ACTUAL: ${currentMode}]\n${text}`;
  conversationHistory.push({ role: 'user', content: contextualizedMessage });

  // Truncar el system prompt si es demasiado extenso.
  // 12.000 chars (~3.430 tokens) — Claude ve instrucciones de gamificación,
  // misiones y casos clínicos que antes quedaban fuera con 8.000.
  let finalSystemPrompt = currentSystemPrompt;
  if (finalSystemPrompt.length > 12000) {
    finalSystemPrompt = finalSystemPrompt.substring(0, 12000) + "\n\n[Contexto adicional disponible bajo demanda]";
  }

  // Diagnóstico de carga (visible en logs de Vercel)
  console.log('Enviando a Claude — longitud system prompt:', finalSystemPrompt.length);
  console.log('Enviando a Claude — mensajes en historial:', conversationHistory.length);

  // Time-out de 45 segundos
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Sin API key aquí — el proxy la maneja de forma segura en el servidor
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,                          // Evita cortar simulaciones y explicaciones largas
        system: finalSystemPrompt,
        messages: conversationHistory.slice(-20),  // Máx 20 msgs (~4.000 tokens) — cubre sesiones normales y simulaciones
        temperature: 0.7
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Claude API Error (${response.status}): ${errorBody}`);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.content?.[0]?.text || "Lo siento, tuve un problema generando la respuesta.";

    // Guardar respuesta en el historial
    conversationHistory.push({ role: 'assistant', content: responseText });

    return responseText;

  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      return "Dr. Medix está tardando más de lo esperado. Por favor intenta de nuevo.";
    }
    console.error("Claude API Error:", error);
    return "Ocurrió un error de conexión con Dr. Medix. Por favor intenta de nuevo.";
  }
};
