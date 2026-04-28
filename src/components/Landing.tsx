import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, BrainCircuit, GraduationCap, Users, Stethoscope, MapPin, ArrowRight, PlayCircle } from 'lucide-react';
import { UserLevel, UserProfile } from '../types';

interface LandingProps {
  onStart: () => void;
  onDemo: (profile: UserProfile) => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onDemo }) => {
  const handleDemoAccess = () => {
    const demoProfile: UserProfile = {
      name: "Experto Demo",
      email: "demo@drmedix.ec",
      phone: "0999999999",
      level: UserLevel.EXPERIMENTADO,
      motivation: "improve_results",
      xp: 500,
      rank: "Aprendiz",
      streak: 1,
      completedModules: [0],
      badges: ["Bienvenido"],
      completedQuizzes: [],
      lastActivity: new Date().toISOString()
    };
    onDemo(demoProfile);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20"
        >
          <Stethoscope className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-400 font-medium tracking-wide uppercase text-xs">Exclusivo para Ecuador</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
        >
          DR. MEDIX
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 font-medium max-w-2xl leading-relaxed"
        >
          El primer programa de formación para <span className="text-white">Visitadores Médicos</span> con IA en Ecuador
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center"
        >
          <button
            onClick={onStart}
            className="px-8 py-5 bg-emerald-500 hover:bg-emerald-400 text-[#020408] font-bold rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20"
          >
            Comenzar Programa Gratuito <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleDemoAccess}
            className="px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            <PlayCircle className="w-5 h-5 text-emerald-400" /> Acceso Demo para Expertos
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 w-full">
          {[
            { icon: BookOpen, title: "20 Módulos Specialized", desc: "Desde anatomía hasta negociación estratégica" },
            { icon: BrainCircuit, title: "Mentor IA 24/7", desc: "Simulaciones interactivas con feedback en tiempo real" },
            { icon: GraduationCap, title: "Certificación Profesional", desc: "Avalada por expertos de la industria local" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl text-left hover:border-emerald-500/30 transition-colors group"
            >
              <item.icon className="w-10 h-10 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-white/5 w-full"
        >
          {[
            { label: "Visitadores en Ecuador", val: "8.000+", icon: Users },
            { label: "Áreas Terapéuticas", val: "17", icon: Stethoscope },
            { label: "Contexto ECU", val: "100%", icon: MapPin }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <stat.icon className="w-5 h-5 text-gray-600 mb-2" />
              <span className="text-2xl font-black text-white">{stat.val}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
