import React from 'react';
import { motion } from 'motion/react';
import { 
  Brain, Heart, Zap, Users, ArrowRight, CheckCircle2, 
  Sparkles, BookOpen, Shield, Play,
  Cpu, Activity
} from 'lucide-react';

interface ModuleEmotionalIntelligenceProps {
  onStartChat: () => void;
}

const COMPONENTS = [
  { 
    title: 'Autoconciencia', 
    icon: Brain, 
    color: 'from-blue-500 to-indigo-600',
    text: 'Identificar tus emociones (frustración, ansiedad, orgullo) en tiempo real durante la visita. La base de todo control.' 
  },
  { 
    title: 'Autorregulación', 
    icon: Shield, 
    color: 'from-emerald-500 to-teal-600',
    text: 'Gestionar impulsos. No reaccionar a la agresividad de un médico, sino responder estratégicamente.' 
  },
  { 
    title: 'Motivación', 
    icon: Zap, 
    color: 'from-amber-400 to-orange-600',
    text: 'Mantener la energía tras una mañana de "noes" o complicaciones de tráfico en Quito/Guayaquil.' 
  },
  { 
    title: 'Empatía', 
    icon: Heart, 
    color: 'from-rose-500 to-pink-600',
    text: 'Entender las presiones del médico: saturación del IESS o la búsqueda de prestigio en la práctica privada.' 
  },
  { 
    title: 'HH. Sociales', 
    icon: Users, 
    color: 'from-purple-500 to-violet-600',
    text: 'Influencia ética, generación de rapport y manejo magistral de conflictos en el consultorio.' 
  },
];

const ModuleEmotionalIntelligence: React.FC<ModuleEmotionalIntelligenceProps> = ({ onStartChat }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020408] text-slate-200 pb-24">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-medical-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
          >
            <Sparkles size={14} className="text-medical-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-medical-400">Módulo Especial Avanzado</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-editorial font-black text-white mb-6 tracking-tight leading-[0.9] uppercase"
          >
            Inteligencia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-400 via-blue-500 to-indigo-400 italic font-editorial">Emocional</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Donde la ciencia médica se une con la maestría humana. El método definitivo para diferenciarte de la competencia en el mercado farmacéutico ecuatoriano.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStartChat}
              className="px-10 py-5 rounded-2xl bg-medical-500 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-medical-500/20 hover:-translate-y-1 transition-all flex items-center gap-4 group"
            >
              Iniciar Mentoría <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── The 5 Pillars ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-editorial font-black text-white uppercase tracking-tight mb-4 italic">Los 5 Pilares de Goleman</h2>
              <p className="text-slate-500 font-medium leading-relaxed">Adaptados al despliegue táctico del visitador médico en hospitales del IESS, MSP y práctica privada.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-1 w-12 bg-medical-500 rounded-full" />
              <div className="w-4 h-1 bg-white/10 rounded-full" />
              <div className="w-2 h-1 bg-white/10 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {COMPONENTS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-6 sm:p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tighter mb-4 leading-tight break-words w-full">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
                  {item.text}
                </p>
                
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 size={16} className="text-medical-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Neuroscience & Protocols ── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-editorial font-black text-white uppercase tracking-tight mb-6 italic">Neurociencia en el Consultorio</h2>
              <p className="text-slate-400 text-lg leading-relaxed">No es solo "sentir", es química cerebral. Domina el <strong>Secuestro Amigdalar</strong> y la <strong>Pausa Táctica</strong> para mantener el control donde otros fallan.</p>
            </div>

            <div className="space-y-6">
              {[
                { title: 'Secuestro Amigdalar', text: 'Esa reacción visceral tras un rechazo. Aprenderás a desactivarla en 4 segundos.', icon: Activity },
                { title: 'Protocolo Match-Pace-Lead', text: 'Iguala el tono del médico, respeta su ritmo y luego dirígelo hacia la prescripción.', icon: Cpu },
                { title: 'Empatía Cognitiva', text: 'No es sentir su dolor, es entender su lógica de decisión en el IESS/MSP.', icon: Brain },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-medical-500/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-medical-500 shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full aspect-square relative">
            <div className="absolute inset-0 bg-medical-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="relative h-full w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 overflow-hidden flex flex-col justify-center items-center text-center">
              <Cpu size={120} className="text-medical-500 mb-8 animate-float" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Simulador de Alta Fidelidad</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">El Dr. Medix interpretará perfiles de médicos reales del Ecuador (Dr. Carrasco, Dra. Salinas) para que practiques tu inteligencia emocional en escenarios "bajo fuego".</p>
              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-lg bg-medical-500/10 border border-medical-500/20 text-medical-400 text-[10px] font-black uppercase tracking-widest">Escenarios IESS</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">Escenarios Privados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Studies Preview ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div>
            <h2 className="text-3xl font-display font-black text-white uppercase mb-4 tracking-tight">Anatomía de la Maestría</h2>
            <p className="text-slate-500 font-medium">Comparamos la visita tradicional vs. la visita con Inteligencia Emocional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
              <div className="flex items-center gap-3 text-red-500">
                <Shield size={20} />
                <span className="font-black uppercase tracking-widest text-xs">Visita Tradicional</span>
              </div>
              <h4 className="text-xl font-bold text-white">Reacción Impulsiva</h4>
              <p className="text-sm text-slate-500 leading-relaxed italic">"El médico está apurado, me pongo nervioso, hablo más rápido, ignoro su lenguaje no verbal y trato de soltar el discurso técnico antes de que me eche."</p>
              <div className="pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-red-500/50">
                <span>Resultado: Rechazo</span>
                <span>Eficiencia: 12%</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-medical-500/5 border border-medical-500/20 space-y-6 relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-medical-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="flex items-center gap-3 text-medical-400">
                <Sparkles size={20} />
                <span className="font-black uppercase tracking-widest text-xs text-medical-400">Visita con IA</span>
              </div>
              <h4 className="text-xl font-bold text-white">Match - Pace - Lead</h4>
              <p className="text-sm text-slate-300 leading-relaxed italic font-medium">"Detecto su estrés (Match). Valido su tiempo y hablo a su velocidad (Pace). Una vez que me mira a los ojos conectado, introduzco el beneficio clínico (Lead)."</p>
              <div className="pt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-medical-500">
                <span>Resultado: Compromiso</span>
                <span>Eficiencia: 88%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-medical-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-10 relative z-10">
          <BookOpen size={64} className="text-medical-500 mx-auto animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none italic">¿Listo para transformar <br />tu carrera?</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Inicia ahora la práctica con el Dr. Medix. Aprenderás a leer a los médicos del Ecuador como nadie más lo hace.
          </p>
          <button 
            onClick={onStartChat}
            className="group relative inline-flex items-center gap-4 px-16 py-7 rounded-[2.5rem] bg-gradient-to-r from-medical-500 to-indigo-600 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:shadow-medical-500/60 hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Empezar Tutoría de I.E.
            <Play size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModuleEmotionalIntelligence;
