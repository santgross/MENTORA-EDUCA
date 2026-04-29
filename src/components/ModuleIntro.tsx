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
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#05070A] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-medical-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full z-10"
      >
        {/* Module Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-medical-500/10 border border-medical-500/20 text-medical-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            Módulo {moduleId}
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
            {moduleTitle}
          </h1>
          <p className="text-xl text-slate-400 font-medium tracking-tight">
            {moduleSubtitle}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/10">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-bold text-slate-300">{duration}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-medical-500/10 rounded-2xl border border-medical-500/20">
            <Trophy className="w-4 h-4 text-medical-500" />
            <span className="text-sm font-bold text-medical-500">+{xpReward} XP</span>
          </div>
          {prerequisite && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-2xl border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-amber-500">Prerrequisito: {prerequisite}</span>
            </div>
          )}
        </div>

        {/* Learning Objectives */}
        <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 md:p-10 mb-10 shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            Objetivos de Aprendizaje
          </h3>
          <div className="space-y-6">
            {objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="mt-1 shrink-0 bg-medical-500/20 p-1.5 rounded-lg group-hover:bg-medical-500/30 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-medical-500" />
                </div>
                <p className="text-slate-300 font-medium leading-relaxed">
                  {obj}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onStartChat}
            className="group relative px-10 py-5 bg-medical-500 hover:bg-medical-400 text-white font-black rounded-2xl flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-medical-500/20"
          >
            Iniciar Módulo con Dr. Medix
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Disclaimer/Footer */}
        <p className="text-center mt-12 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          Experiencia de aprendizaje guiada por Inteligencia Artificial
        </p>
      </motion.div>
    </div>
  );
};

export default ModuleIntro;
