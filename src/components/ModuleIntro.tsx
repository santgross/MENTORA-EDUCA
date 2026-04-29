import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';

interface ModuleIntroProps {
  moduleId: number;
  moduleTitle: string;
  moduleSubtitle: string;
  duration: string;
  objectives: string[];
  prerequisite?: string;
  xpReward: number;
  onStartChat: () => void;
}

const ModuleIntro: React.FC<ModuleIntroProps> = ({
  moduleId,
  moduleTitle,
  moduleSubtitle,
  duration,
  objectives,
  prerequisite,
  xpReward,
  onStartChat
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#05070A] relative overflow-hidden h-full">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-medical-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full z-10 flex flex-col items-center"
      >
        {/* Module Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-medical-400 text-sm font-bold uppercase tracking-widest mb-1.5"
          >
            Módulo {moduleId}
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-2 uppercase px-2">
            {moduleTitle}
          </h1>
          <p className="text-base text-slate-400 font-medium tracking-tight px-4">
            {moduleSubtitle}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-bold text-slate-300">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-medical-500/10 rounded-xl border border-medical-500/20">
            <Trophy className="w-3.5 h-3.5 text-medical-500" />
            <span className="text-xs font-bold text-medical-500">+{xpReward} XP</span>
          </div>
          {prerequisite && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-bold text-amber-500">{prerequisite}</span>
            </div>
          )}
        </div>

        {/* Learning Objectives Box */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 mb-8 w-full shadow-2xl max-w-lg">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
            Objetivos de Aprendizaje
          </h3>
          <div className="space-y-4">
            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-start gap-3 group"
              >
                <div className="mt-0.5 shrink-0 bg-medical-500/20 p-1 rounded-md group-hover:bg-medical-500/30 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-medical-500" />
                </div>
                <p className="text-slate-300 text-sm font-medium leading-relaxed text-left">
                  {obj}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center w-full">
          <button
            onClick={onStartChat}
            className="group relative px-8 py-4 bg-medical-500 hover:bg-medical-400 text-white font-black text-sm rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-medical-500/20"
          >
            Iniciar Módulo con Dr. Medix
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Disclaimer/Footer */}
        <p className="text-center mt-8 text-slate-700 text-[9px] font-black uppercase tracking-[0.2em]">
          Mentor IA Especializado
        </p>
      </motion.div>
    </div>
  );
};

export default ModuleIntro;
