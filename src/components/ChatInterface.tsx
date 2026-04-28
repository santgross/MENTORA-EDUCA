import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, AppMode, UserProfile } from '../types';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';
import { InteractiveWidget, WidgetData } from './chat/Widgets';
import { Send, GraduationCap, Scale, Users, HeartHandshake, Bot, Volume2, StopCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onXPIncrease: () => void;
  activeModuleId: number;
  userProfile: UserProfile;
}

const MODES = [
  { id: AppMode.TUTOR,     label: 'Tutor',     icon: GraduationCap, color: 'text-blue-500', hex: '#3b82f6', bg: 'bg-blue-50', border: 'border-blue-100', tooltip: 'Explica conceptos, responde dudas y guía tu aprendizaje paso a paso' },
  { id: AppMode.EVALUADOR, label: 'Evaluador', icon: Scale,         color: 'text-amber-500', hex: '#f59e0b', bg: 'bg-amber-50', border: 'border-amber-100', tooltip: 'Lanza quizzes, corrige respuestas y mide tu nivel de conocimiento' },
  { id: AppMode.SIMULADOR, label: 'Simulador', icon: Users,         color: 'text-purple-500', hex: '#a855f7', bg: 'bg-purple-50', border: 'border-purple-100', tooltip: 'Practica visitas médicas: el Dr. Medix interpreta al médico real' },
  { id: AppMode.MENTOR,    label: 'Mentor',    icon: HeartHandshake,color: 'text-rose-500', hex: '#f43f5e', bg: 'bg-rose-50', border: 'border-rose-100', tooltip: 'Consejo de carrera, estrategia profesional y desarrollo personal' },
];

const MODE_PLACEHOLDER: Record<AppMode, string> = {
  [AppMode.TUTOR]:     'Pregúntale al Tutor cualquier concepto del módulo...',
  [AppMode.EVALUADOR]: 'Pide un quiz: "evalúame sobre el ecosistema farmacéutico"...',
  [AppMode.SIMULADOR]: 'Di "simula una visita con un cardiólogo" para comenzar...',
  [AppMode.MENTOR]:    'Comparte un resto de carrera y pide consejo al Mentor...',
};

  const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, setMessages, onXPIncrease, activeModuleId, userProfile }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.TUTOR);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [hoveredMode, setHoveredMode] = useState<AppMode | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef    = useRef<HTMLTextAreaElement>(null);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await initializeChat(userProfile, messages, activeModuleId);
        if (messages.length === 0) {
          const firstResponse = await sendMessageToGemini("Hola Dr. Medix, estoy listo para comenzar este módulo.", currentMode);
          const aiMsg: Message = { id: Date.now().toString(), role: 'model', text: firstResponse, timestamp: new Date() };
          setMessages([aiMsg]);
        }
      } catch (err) {
        console.error("Error initializing chat:", err);
      } finally {
        setIsLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModuleId]);

  useEffect(() => {
    if (messages.length === 0) return;
    
    const lastMsg = messages[messages.length - 1];
    
    if (messages.length === 1 && lastMsg.role === 'model') {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      return;
    }

    if (lastMsg.role === 'user') {
      scrollToBottom();
    } else if (lastMsg.role === 'model' && !isLoading) {
      // AI just finished responding - scroll to the START of the AI message
      setTimeout(() => {
        if (lastMessageRef.current && scrollRef.current) {
          const container = scrollRef.current;
          const target = lastMessageRef.current;
          // Calculate desired scroll position: target's top minus some padding for the header/banner
          const targetY = target.offsetTop - 120; 
          container.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) setAvailableVoices(v);
    };
    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined)
      window.speechSynthesis.onvoiceschanged = load;
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakText = (text: string, messageId: string) => {
    if (isSpeaking === messageId) { window.speechSynthesis.cancel(); setIsSpeaking(null); return; }
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/\*\*/g,'').replace(/\*/g,'').replace(/#/g,'').replace(/`/g,'')
      .replace(/\[.*?\]/g,'').replace(/---/g,'')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
    const utt = new SpeechSynthesisUtterance(clean);
    const voice = availableVoices.find(v => v.lang === 'es-US')
                || availableVoices.find(v => v.lang === 'es-MX')
                || availableVoices.find(v => v.lang.startsWith('es'));
    if (voice) utt.voice = voice;
    utt.lang = voice ? voice.lang : 'es-ES';
    utt.rate = 1.0; utt.pitch = 1.0;
    utt.onstart = () => setIsSpeaking(messageId);
    utt.onend   = () => setIsSpeaking(null);
    utt.onerror = () => setIsSpeaking(null);
    window.speechSynthesis.speak(utt);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = typeof textOverride === 'string' ? textOverride : input;
    if (!textToSend.trim() || isLoading) return;
    
    const userText = textToSend.trim();
    if (!textOverride) setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const newMsg: Message = { id: Date.now().toString(), role: 'user', text: userText, timestamp: new Date() };
    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);
    try {
      const responseText = await sendMessageToGemini(userText, currentMode);
      const aiMsg: Message = { id: (Date.now()+1).toString(), role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      onXPIncrease();
    } catch (err) {
      console.error('Failed to send message', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const displayMode = hoveredMode ?? currentMode;
  const displayInfo = MODES.find(m => m.id === displayMode)!;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#020408] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-500/5 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-32 -mb-32 pointer-events-none" />
      
      {/* ── Header ── */}
      <header className="h-16 sm:h-20 glass-dark px-4 sm:px-8 flex items-center justify-between z-30 shrink-0 border-b border-white/5 sticky top-0">
        <div className="flex items-center gap-3 sm:gap-5 ml-10 sm:ml-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-medical-400 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-medical-400 border border-white/10 backdrop-blur-3xl shadow-2xl">
              <Bot size={20} className="animate-float" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#020408] rounded-full shadow-sm" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-black text-base sm:text-xl text-white tracking-tight leading-none uppercase tracking-[0.1em]">Dr. Medix</h2>
              <div className="px-1.5 py-0.5 rounded-md bg-medical-500/10 text-medical-400 text-[8px] font-black uppercase tracking-widest border border-medical-500/20">
                Módulo {activeModuleId}
              </div>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block mt-0.5 opacity-60">IA Mentor Especialista</span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 bg-white/[0.03] p-1 sm:p-1.5 rounded-xl border border-white/10 backdrop-blur-xl">
          {MODES.map(mode => {
            const Icon = mode.icon;
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
                onMouseEnter={() => setHoveredMode(mode.id)}
                onMouseLeave={() => setHoveredMode(null)}
                className={`p-1.5 sm:px-4 sm:py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-medical-500 text-white shadow-lg shadow-medical-500/20 border border-medical-400/50' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
                title={mode.label}
              >
                <Icon size={14} />
                <span className="hidden md:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ── Mode Interaction Banner ── */}
      <motion.div 
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-medical-500 text-white px-4 sm:px-8 py-2 flex items-center justify-between z-20 shrink-0 border-b border-medical-400/30"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-1 bg-white/20 rounded shadow-inner">
            {React.createElement(displayInfo.icon, { size: 12 })}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{displayInfo.label}:</span>
          <span className="text-[11px] font-medium text-white/90 italic truncate opacity-90">{displayInfo.tooltip}</span>
        </div>
        <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-white/60">
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-white/40 rounded-full" /> LATENCIA: 1.2S</span>
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-white/40 rounded-full" /> MODELO: GEMINI 3.1 PRO</span>
        </div>
      </motion.div>

      {/* ── Chat Canvas ── */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar pt-8 pb-48 px-6 sm:px-8 lg:px-12 relative z-10 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto w-full space-y-16">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                ref={idx === messages.length - 1 ? lastMessageRef : null}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 sm:gap-10 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-500 mt-2 ${
                  msg.role === 'user' 
                    ? 'bg-medical-500 text-white border border-medical-400/20' 
                    : 'bg-white/[0.03] text-medical-400 border border-white/10'
                }`}>
                  {msg.role === 'user' ? userProfile.name.charAt(0).toUpperCase() : <Bot size={18} />}
                </div>

                {/* Content Area */}
                <div className={`max-w-[90%] sm:max-w-[85%] lg:max-w-[70%] flex-1 space-y-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`transition-all duration-500 shadow-sm ${
                    msg.role === 'user'
                      ? 'p-5 sm:p-6 rounded-[2rem] rounded-tr-none bg-medical-500/10 text-white border border-medical-500/20 shadow-xl shadow-medical-500/5 ml-auto text-right'
                      : 'text-slate-200 bg-white/[0.03] border border-white/5 p-5 sm:p-6 rounded-[2rem] rounded-tl-none mr-auto'
                  }`}>
                    <div className={msg.role === 'model' ? "markdown-body text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.7] sm:leading-[1.8] text-slate-200 font-normal tracking-tight text-left hyphens-auto" : "text-[15px] sm:text-[16px] leading-relaxed font-medium"}>
                      {msg.role === 'model' ? (
                        <>
                          {msg.text.split(/(\[WIDGET:\s*\{[\s\S]*?\}\s*\])/).map((part, pIdx) => {
                            const trimmedPart = part.trim();
                            if (trimmedPart.startsWith('[WIDGET:') && trimmedPart.endsWith(']')) {
                              try {
                                const jsonStr = trimmedPart.substring(8, trimmedPart.length - 1).trim();
                                const widgetData = JSON.parse(jsonStr) as WidgetData;
                                return (
                                  <InteractiveWidget 
                                    key={pIdx} 
                                    data={widgetData} 
                                    onComplete={(success) => {
                                      if (success) onXPIncrease();
                                    }} 
                                  />
                                );
                              } catch (e) {
                                console.error("Error parsing widget JSON:", e, "Content:", trimmedPart);
                                return <ReactMarkdown key={pIdx}>{part}</ReactMarkdown>;
                              }
                            }
                            return <ReactMarkdown key={pIdx}>{part}</ReactMarkdown>;
                          })}
                        </>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-4 px-1 ${msg.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row'}`}>
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em] opacity-40">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.role === 'model' && (
                      <button 
                        onClick={() => speakText(msg.text, msg.id)}
                        className={`hover:text-medical-500 transition-colors p-1 rounded-md hover:bg-white/5 ${isSpeaking === msg.id ? 'text-medical-500' : 'text-slate-800'}`}
                        title="Escuchar respuesta"
                      >
                        {isSpeaking === msg.id ? <StopCircle size={14} /> : <Volume2 size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Quick Start Buttons for Evaluations */}
          {messages.length === 1 && currentMode === AppMode.EVALUADOR && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center flex-col items-center gap-8 py-12 px-6"
            >
              <div className="text-center max-w-sm space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight">¿Evaluamos el avance?</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Haré 5 preguntas clave sobre el contenido del Módulo {activeModuleId} para certificar tu XP.</p>
              </div>
              <button 
                onClick={() => handleSend("Inicia una evaluación rápida sobre los temas más importantes para mi nivel.")}
                className="group relative flex items-center gap-4 px-12 py-5 rounded-[2rem] bg-gradient-to-r from-medical-500 to-indigo-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:shadow-medical-500/40 hover:-translate-y-1 transition-all active:scale-95 overflow-hidden"
              >
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                Iniciar Prueba de Conocimiento
              </button>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-6"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-medical-500 shrink-0">
                <Bot size={20} className="animate-pulse" />
              </div>
              <div className="flex gap-1.5 p-4 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-2xl px-6">
                <div className="w-1.5 h-1.5 bg-medical-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-medical-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-medical-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* ── Claude-style Centered Fixed Input ── */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-20 bg-gradient-to-t from-[#020408] via-[#020408]/95 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:pb-12 sm:px-8 z-30 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full pointer-events-auto">
          <div className="relative group">
            {/* Ambient Background Focus Glow */}
            <div className="absolute -inset-2 bg-medical-500/10 rounded-[3rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-[#0A1018] border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] p-2 sm:p-3 focus-within:border-medical-500/50 transition-all duration-500">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder={MODE_PLACEHOLDER[currentMode]}
                className="w-full bg-transparent border-none focus:ring-0 p-4 sm:p-5 text-white placeholder:text-slate-800 resize-none max-h-48 custom-scrollbar text-[15px] sm:text-[17px] font-medium leading-[1.6]"
                rows={1}
              />
              
              <div className="flex items-center justify-between px-6 pb-4">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-medical-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] block">SISTEMA ACTIVO</span>
                  </div>
                  <div className="h-4 w-px bg-white/5 hidden sm:block" />
                  <div className="flex items-center gap-2 group/mod">
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.25em]">MÓDULO {activeModuleId}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  style={{ 
                    backgroundColor: (!input.trim() || isLoading) ? undefined : displayInfo.hex,
                    boxShadow: (!input.trim() || isLoading) ? undefined : `0 10px 25px -5px ${displayInfo.hex}66`
                  }}
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-500 ${
                    !input.trim() || isLoading
                      ? 'text-slate-800 bg-white/5 cursor-not-allowed opacity-50'
                      : 'text-white hover:scale-105 active:scale-95'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={22} />
                  )}
                </button>
              </div>
            </div>
            
            {/* Status indicators moved slightly higher to be within solid gradient area if possible */}
            <div className="flex justify-between mt-4 px-10 pointer-events-none opacity-20">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">DR. MEDIX MÉDICO-CIENTÍFICO</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">V3.1.2 ENCRYPTION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
