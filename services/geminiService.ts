
import { GoogleGenAI, Chat, Content } from "@google/genai";
import { DR_MEDIX_SYSTEM_PROMPT } from "../constants";
import { UserProfile, AppMode, Message } from "../types";

let aiInstance: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAIInstance = () => {
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiInstance;
};

export const initializeChat = async (user: UserProfile, previousMessages: Message[] = []) => {
  const ai = getAIInstance();
  
  // 1. Convert app messages to Gemini Content format for history
  // Note: We map directly as Message Role ('user' | 'model') aligns with Gemini API expectations.
  const history: Content[] = previousMessages
    .map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

  const hasHistory = history.length > 0;

  // 2. Define Conditional Instructions
  let specificInstruction = "";

  if (!hasHistory) {
    // --- SCENARIO A: FIRST TIME STARTING MODULE 1 (POST-AUDIO) ---
    specificInstruction = `
    **ESTADO ACTUAL:** El estudiante ACABA de iniciar el Módulo 1 y **YA ESCUCHÓ** el audio obligatorio de introducción ("El Dilema: Sector Público vs Privado").
    
    **TU PRIMERA ACCIÓN (OBLIGATORIA):**
    1. **Bienvenida ÚNICA**: "¡Bienvenido a bordo, ${user.name}! 🚀 Módulo 1 activado."
    2. **Referencia al Audio**: Menciona que acaban de escuchar el debate sobre dónde debe enfocarse un novato (Público vs Privado).
    3. **Pregunta de Activación**: Pregúntale directamente: "¿Qué postura te convenció más del audio? ¿La estabilidad del sector público o la agilidad del privado? ¿Por qué?"
    
    NOTA: NO preguntes "¿en qué te ayudo?". TOMA LA INICIATIVA debatiendo sobre el audio.
    `;
  } else {
    // --- SCENARIO B: CONTINUING CONVERSATION ---
    specificInstruction = `
    **ESTADO ACTUAL:** Conversación en curso. El estudiante ya ha interactuado contigo.
    
    **REGLAS DE CONTINUIDAD:**
    1. **MEMORIA ACTIVA**: Analiza el historial de chat adjunto. Tus respuestas deben tener coherencia total con lo último que se habló.
    2. **CERO REPETICIONES**: NO vuelvas a dar la bienvenida ni a presentarte como Dr. Medix (ya lo saben).
    3. **REFUERZO POSITIVO**: Usa variedad de frases motivadoras cuando el estudiante acierte o pregunte algo interesante:
       - "¡Excelente respuesta, ${user.name}!"
       - "¡Muy bien analizado!"
       - "¡Exacto! Vas por buen camino."
       - "¡Punto clave! Me alegra que lo notaras."
    4. **FLUJO NATURAL**: Si el estudiante respondió una pregunta, evalúala y pasa al siguiente concepto suavemente.
    `;
  }

  // 3. Construct Final System Prompt
  const personalizedSystemInstruction = `
    ${DR_MEDIX_SYSTEM_PROMPT}
    
    **PERFIL DEL ESTUDIANTE:**
    - Nombre: ${user.name}
    - Nivel: ${user.level} 
    - XP: ${user.xp} (${user.rank})
    
    ${specificInstruction}
  `;

  // 4. Create Chat with History
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: personalizedSystemInstruction,
      temperature: 0.7,
      topK: 40,
    },
    history: history
  });

  return chatSession;
};

export const sendMessageToGemini = async (text: string, currentMode: AppMode): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized");
  }

  // Prepend the mode to the message so the model knows context without user typing it
  const contextualizedMessage = `[MODO ACTUAL: ${currentMode}]\n${text}`;

  try {
    const response = await chatSession.sendMessage({ message: contextualizedMessage });
    return response.text || "Lo siento, tuve un problema generando la respuesta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocurrió un error de conexión con Dr. Medix. Por favor intenta de nuevo.";
  }
};
