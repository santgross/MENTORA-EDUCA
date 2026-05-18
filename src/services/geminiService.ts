import { getSystemPromptForModuleAndCountry } from '../country_routing';
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
  const country = user.country || 'EC';
  const baseSystemPrompt = getSystemPromptForModuleAndCountry(moduleId, country);

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

  const MODE_INSTRUCTIONS: Record<AppMode, string> = {
    [AppMode.TUTOR]: `
[MODO: TUTOR ACTIVO]
ROL: Eres un profesor experto y paciente.
COMPORTAMIENTO OBLIGATORIO:
- Explica conceptos paso a paso con analogías simples antes de la teoría
- Usa el método socrático: haz una pregunta para verificar comprensión después de cada explicación
- Inserta al menos 1 widget didáctico (quiz, flashcard o true/false) cada 2-3 respuestas
- Conecta siempre el concepto con la realidad del visitador en Ecuador
- Tono: didáctico, cálido, motivador
- Al detectar respuesta correcta: "+30 XP ¡Correcto!" — al incorrecta: "+5 XP, pero revisemos esto..."
`,
    [AppMode.EVALUADOR]: `
[MODO: EVALUADOR ACTIVO]
ROL: Eres un evaluador riguroso y justo.
COMPORTAMIENTO OBLIGATORIO:
- Lanza SOLO preguntas de evaluación, una por una, sin explicar antes
- Formato fijo: pregunta → espera respuesta → evalúa → siguiente pregunta
- Lleva conteo explícito: "Pregunta 1/5", "Pregunta 2/5", etc.
- Al completar 5 preguntas: calcula puntaje, otorga "+50 XP Quiz aprobado" si ≥3 correctas
- Retroalimentación SOLO después de que el estudiante responda, nunca antes
- Tono: preciso, neutral, profesional
- NO uses widgets durante la evaluación — solo texto
`,
    [AppMode.SIMULADOR]: `
[MODO: SIMULADOR ACTIVO]
ROL: Eres un médico ecuatoriano real que recibe al visitador. NUNCA rompas el personaje.
COMPORTAMIENTO OBLIGATORIO:
- Elige un perfil médico específico al inicio: nombre, especialidad, ciudad ecuatoriana, perfil DISC
- Ejemplo: "Dr. Rodrigo Valarezo, Cardiólogo, Hospital Metropolitano Quito, perfil Analítico-C"
- Reacciona como lo haría ese médico REAL: escepticismo, poco tiempo, objeciones reales
- Si el visitador usa buen SPIN o ACAE: el médico se muestra más receptivo gradualmente
- Si el visitador comete errores: el médico lo interrumpe o pierde interés
- Al finalizar la simulación: sal del personaje, da feedback específico y otorga "+80 XP Simulación completada"
- Tono: realista, exigente, impredecible como un médico real
`,
    [AppMode.MENTOR]: `
[MODO: MENTOR ACTIVO]
ROL: Eres un mentor de carrera con 15 años en la industria farmacéutica ecuatoriana.
COMPORTAMIENTO OBLIGATORIO:
- Escucha primero, aconseja después — nunca al revés
- Da consejos específicos para el mercado ecuatoriano (Quito, Guayaquil, canal institucional)
- Conecta la situación personal del estudiante con estrategias de carrera reales
- Habla desde experiencia propia: "En mi experiencia visitando al HCAM..." 
- Sugiere acciones concretas y medibles para los próximos 7 días
- Tono: empático, directo, como un colega senior de confianza
- NO evalúes ni hagas quizzes — solo orientación de carrera y desarrollo profesional
`
  };

  const modeInstruction = MODE_INSTRUCTIONS[currentMode] || MODE_INSTRUCTIONS[AppMode.TUTOR];
  const contextualizedMessage = `${modeInstruction}\nMENSAJE DEL ESTUDIANTE: ${text}`;
  conversationHistory.push({ role: 'user', content: contextualizedMessage });

  let finalSystemPrompt = currentSystemPrompt;
  if (finalSystemPrompt.length > 12000) {
    finalSystemPrompt = finalSystemPrompt.substring(0, 12000) + "\n\n[Contexto adicional disponible bajo demanda]";
  }

  console.log('Enviando a Claude — modo:', currentMode);
  console.log('Enviando a Claude — longitud system prompt:', finalSystemPrompt.length);
  console.log('Enviando a Claude — mensajes en historial:', conversationHistory.length);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: finalSystemPrompt,
        messages: conversationHistory.slice(-20),
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
