
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, AppMode } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, GraduationCap, Scale, Users, HeartHandshake, Bot, Loader2, Mic, MicOff, Volume2, Square, StopCircle } from 'lucide-react';
import IntroAudioModal from './IntroAudioModal';

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onXPIncrease: () => void;
}

const MODES = [
  { id: AppMode.TUTOR, label: 'Tutor', icon: GraduationCap, color: 'text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-200' },
  { id: AppMode.EVALUADOR, label: 'Evaluador', icon: Scale, color: 'text-purple-500 bg-purple-50 hover:bg-purple-100 border-purple-200' },
  { id: AppMode.SIMULADOR, label: 'Simulador', icon: Users, color: 'text-orange-500 bg-orange-50 hover:bg-orange-100 border-orange-200' },
  { id: AppMode.MENTOR, label: 'Mentor', icon: HeartHandshake, color: 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, setMessages, onXPIncrease }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.TUTOR);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null); // ID of message being spoken
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Logic for mandatory audio
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [hasListenedToAudio, setHasListenedToAudio] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null); // Type any for Web Speech API

  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Effect to trigger audio modal if it's the very start of Module 1 interaction
  useEffect(() => {
    if (messages.length <= 1 && !hasListenedToAudio) {
      const savedAudioStatus = localStorage.getItem('dr_medix_audio_m1_done');
      if (!savedAudioStatus) {
        setShowAudioModal(true);
      } else {
        setHasListenedToAudio(true);
      }
    }
  }, [messages.length, hasListenedToAudio]);

  const handleAudioComplete = () => {
    setHasListenedToAudio(true);
    setShowAudioModal(false);
    localStorage.setItem('dr_medix_audio_m1_done', 'true');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // --- Voice Recognition Logic (STT) ---
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Tu navegador no soporta reconocimiento de voz. Por favor usa Google Chrome o Edge.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false; // Stop after one sentence for chat-like feel
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'es-EC'; // Ecuador Spanish

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      
      setInput(transcript);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // --- Text to Speech Logic (TTS) ---
  const speakText = (text: string, messageId: string) => {
    // If currently speaking this message, stop.
    if (isSpeaking === messageId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Clean markdown and emojis for better speech
    const cleanText = text
      .replace(/\*\*/g, '') // Bold
      .replace(/\*/g, '')   // Italic
      .replace(/#/g, '')    // Headers
      .replace(/`/g, '')    // Code
      .replace(/\[.*\]/g, '') // Brackets usually strictly visual in this app
      .replace(/---/g, '') // Separators
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, ''); // Remove Emojis

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Attempt to find a Latin American Spanish voice
    const preferredVoice = availableVoices.find(v => v.lang === 'es-US') || // Google Español
                           availableVoices.find(v => v.lang === 'es-MX') || // Mexican Spanish
                           availableVoices.find(v => v.lang.startsWith('es')); // Fallback any Spanish

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.lang = preferredVoice ? preferredVoice.lang : 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(messageId);
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    window.speechSynthesis.speak(utterance);
  };

  // --- Messaging Logic ---

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userText, currentMode);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      onXPIncrease(); 
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      
      {showAudioModal && <IntroAudioModal onComplete={handleAudioComplete} />}

      {/* Header / Mode Selector */}
      <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
           <Bot className="w-6 h-6 text-teal-600" />
           <h2 className="font-bold text-slate-800">Dr. Medix</h2>
        </div>
        
        <div className="flex gap-2">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = currentMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  isActive 
                    ? mode.color + ' ring-2 ring-offset-1 ring-slate-100' 
                    : 'text-slate-500 bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50 custom-scrollbar ${showAudioModal ? 'blur-sm pointer-events-none' : ''}`}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm relative group ${
                msg.role === 'user'
                  ? 'bg-teal-600 text-white rounded-br-none'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}
            >
              <div className="prose prose-sm max-w-none break-words">
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-2">
                 <div className={`text-[10px] ${msg.role === 'user' ? 'text-teal-200' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Speaker Button for AI Messages */}
                {msg.role === 'model' && (
                  <button 
                    onClick={() => speakText(msg.text, msg.id)}
                    className={`p-1 rounded-full transition-colors ${
                      isSpeaking === msg.id 
                        ? 'bg-teal-100 text-teal-600' 
                        : 'text-slate-400 hover:text-teal-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100'
                    }`}
                    title="Escuchar respuesta"
                  >
                    {isSpeaking === msg.id ? <StopCircle className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-slate-100 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
              <span className="text-sm text-slate-400">Dr. Medix está escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 bg-white border-t border-slate-100 ${showAudioModal ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className={`max-w-4xl mx-auto relative flex items-end gap-2 bg-slate-100 p-2 rounded-2xl border transition-all ${isListening ? 'border-red-400 ring-2 ring-red-100 bg-red-50' : 'border-slate-200 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100'}`}>
          
          {/* Microphone Button */}
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl transition-all ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' 
                : 'bg-transparent text-slate-400 hover:text-teal-600 hover:bg-slate-200'
            }`}
            title={isListening ? "Detener grabación" : "Grabar voz"}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Escuchando... (habla ahora)" : `Escribe aquí para hablar con el ${currentMode.toLowerCase()}...`}
            className="w-full bg-transparent border-none text-slate-800 focus:ring-0 resize-none py-3 px-2 max-h-32 text-sm placeholder:text-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
           <p className="text-[10px] text-slate-400">La IA puede cometer errores. Verifica la información normativa (ARCSA/MSP).</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
