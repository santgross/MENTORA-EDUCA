
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, CheckCircle2, Headphones, AlertCircle } from 'lucide-react';
import { AUDIO_TRANSCRIPT_M1 } from '../constants';

interface IntroAudioModalProps {
  onComplete: () => void;
}

const IntroAudioModal: React.FC<IntroAudioModalProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Simulation speed (lower = faster)
  const TICK_RATE = 100; 
  const TOTAL_DURATION_SEC = 45; // Simulated duration

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (TOTAL_DURATION_SEC * (1000 / TICK_RATE)));
          if (newProgress >= 100) {
            setIsPlaying(false);
            setIsCompleted(true);
            return 100;
          }
          return newProgress;
        });

        // Sync script scroll
        const totalLines = AUDIO_TRANSCRIPT_M1.length;
        const currentProgressPercent = progress / 100;
        const line = Math.floor(currentProgressPercent * totalLines);
        setCurrentLineIndex(Math.min(line, totalLines - 1));

      }, TICK_RATE);
    }

    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500 p-2 rounded-full">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Audio Obligatorio</h2>
              <p className="text-xs text-slate-300">Introducción al Sistema de Salud</p>
            </div>
          </div>
          <div className="bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/50 flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-yellow-500" />
            <span className="text-[10px] font-bold text-yellow-500 uppercase">Escucha requerida</span>
          </div>
        </div>

        {/* Player UI */}
        <div className="bg-slate-100 p-6 border-b border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={togglePlay}
              disabled={isCompleted && progress >= 100}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                isCompleted 
                  ? 'bg-green-500 cursor-default' 
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isCompleted ? <CheckCircle2 className="w-6 h-6 text-white" /> : isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <div className="flex-1">
              <div className="h-2 bg-slate-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>{Math.floor((progress / 100) * TOTAL_DURATION_SEC)}s</span>
                <span>{TOTAL_DURATION_SEC}s</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 italic">
            "El Diálogo: Arquitectura del Sistema de Salud Ecuatoriano"
          </p>
        </div>

        {/* Transcript Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-white space-y-4 custom-scrollbar">
          {AUDIO_TRANSCRIPT_M1.map((line, idx) => (
            <div 
              key={idx} 
              className={`transition-opacity duration-500 ${
                idx === currentLineIndex ? 'opacity-100 bg-yellow-50 -mx-2 px-2 py-1 rounded' : 'opacity-60'
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wide mb-1 block ${
                line.speaker === 'Narrador' ? 'text-purple-600' :
                line.speaker === 'Privado' ? 'text-blue-600' : 'text-teal-600'
              }`}>
                {line.speaker}
              </span>
              <p className="text-sm text-slate-800 leading-relaxed">
                {line.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onComplete}
            disabled={!isCompleted}
            className="px-6 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-900 text-white hover:bg-slate-800 shadow-lg"
          >
            {isCompleted ? 'Continuar al Módulo' : 'Escucha el audio completo para continuar'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default IntroAudioModal;
