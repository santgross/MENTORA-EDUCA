import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

export type WidgetType = 'quiz' | 'true_false' | 'flashcard';

export interface WidgetData {
  type: WidgetType;
  question?: string;
  statement?: string;
  options?: string[];
  correctAnswer?: string | boolean;
  explanation?: string;
  front?: string;
  back?: string;
}

interface InteractiveWidgetProps {
  data: WidgetData;
  onComplete: (success: boolean) => void;
}

export const InteractiveWidget: React.FC<InteractiveWidgetProps> = ({ data, onComplete }) => {
  const [selected, setSelected] = useState<string | boolean | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // --- RENDERING TRUE/FALSE ---
  if (data.type === 'true_false') {
    const handleSelect = (val: boolean) => {
      setSelected(val);
      setShowResult(true);
      onComplete(val === data.correctAnswer);
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-6 p-5 sm:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 overflow-hidden relative group max-w-full"
      >
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={16} className="text-medical-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-medical-500">Reto Rápido</span>
        </div>
        
        <p className="text-lg font-bold text-white mb-6 leading-relaxed italic">
          "{data.statement}"
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => !showResult && handleSelect(true)}
            className={`py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
              showResult 
                ? data.correctAnswer === true ? 'bg-emerald-500 text-white' : selected === true ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-500'
                : 'bg-white/5 text-white hover:bg-emerald-500/20 hover:border-emerald-500/50 border border-white/5'
            }`}
          >
            Verdadero
          </button>
          <button
            onClick={() => !showResult && handleSelect(false)}
            className={`py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
              showResult 
                ? data.correctAnswer === false ? 'bg-emerald-500 text-white' : selected === false ? 'bg-red-500 text-white' : 'bg-white/5 text-slate-500'
                : 'bg-white/5 text-white hover:bg-red-500/20 hover:border-red-500/50 border border-white/5'
            }`}
          >
            Falso
          </button>
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 pt-6 border-t border-white/5"
            >
              <div className="flex items-start gap-3">
                {selected === data.correctAnswer ? (
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                ) : (
                  <XCircle size={20} className="text-red-500 shrink-0" />
                )}
                <p className="text-sm text-slate-400 leading-relaxed text-justify">
                  <span className="font-bold text-white uppercase text-[10px] block mb-1">
                    {selected === data.correctAnswer ? '¡Excelente!' : 'Casi...'}
                  </span>
                  {data.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // --- RENDERING QUIZ ---
  if (data.type === 'quiz') {
    const handleOptionSelect = (option: string) => {
      setSelected(option);
      setShowResult(true);
      onComplete(option === data.correctAnswer);
    };

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-6 p-5 sm:p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 max-w-full"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-medical-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-medical-500">Evaluación Instantánea</span>
        </div>
        
        <p className="text-base font-bold text-white mb-6 leading-relaxed">
          {data.question}
        </p>

        <div className="space-y-3">
          {data.options?.map((opt) => {
            const isCorrect = opt === data.correctAnswer;
            const isSelected = opt === selected;
            
            return (
              <button
                key={opt}
                onClick={() => !showResult && handleOptionSelect(opt)}
                className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                  showResult
                    ? isCorrect 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : isSelected ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/5 border-white/5 text-slate-500'
                    : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:border-medical-500/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{opt}</span>
                  {showResult && isCorrect && <CheckCircle2 size={16} />}
                  {showResult && isSelected && !isCorrect && <XCircle size={16} />}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && data.explanation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 rounded-2xl bg-white/5 text-xs text-slate-400 leading-relaxed italic text-justify"
          >
            {data.explanation}
          </motion.div>
        )}
      </motion.div>
    );
  }

  // --- RENDERING FLASHCARD ---
  if (data.type === 'flashcard') {
    return (
      <div className="my-6 perspective-1000 h-48 sm:h-56">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          className="relative w-full h-full preserve-3d cursor-pointer"
          onClick={() => {
            setIsFlipped(!isFlipped);
            if (!isFlipped) onComplete(true);
          }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-medical-600 to-indigo-700 p-8 flex flex-col items-center justify-center text-center shadow-xl border border-white/20">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-4">¿Sabías qué?</span>
            <p className="text-lg sm:text-xl font-display font-black text-white leading-tight uppercase italic">{data.front}</p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-white/80 uppercase tracking-widest bg-black/20 px-4 py-2 rounded-full">
              Toca para revelar <ArrowRight size={10} />
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rounded-3xl bg-[#0A1018] p-8 flex flex-col items-center justify-center text-center shadow-xl border border-medical-500/30 rotate-y-180">
            <div className="w-10 h-10 rounded-full bg-medical-500/10 flex items-center justify-center text-medical-500 mb-4">
              <Sparkles size={20} />
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              {data.back}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};
