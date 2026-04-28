import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, Briefcase, Linkedin, Users, ArrowRight, CheckCircle2, 
  Sparkles, Shield, Play,
  Target, TrendingUp, FileText
} from 'lucide-react';

interface ModulePersonalBrandProps {
  onStartChat: () => void;
}

const PILLARS = [
  { 
    title: 'Autoridad Científica', 
    icon: Award, 
    color: 'from-blue-500 to-indigo-600',
    text: 'Conocimiento farmacológico profundo y honesto que te posiciona como consultor ante el médico.' 
  },
  { 
    title: 'Confiabilidad', 
    icon: Shield, 
    color: 'from-emerald-500 to-teal-600',
    text: 'Consistencia total entre lo que prometes en la visita y lo que entregas. Reputación blindada.' 
  },
  { 
    title: 'Ecosistema EC', 
    icon: Target, 
    color: 'from-amber-400 to-orange-600',
    text: 'Dominio del MSP, IESS y ARCSA. Entiendes el tablero de ajedrez donde juegas cada día.' 
  },
  { 
    title: 'Ética (COÉTICA)', 
    icon: Briefcase, 
    color: 'from-rose-500 to-pink-600',
    text: 'Diferenciación por integridad. Ganar terreno sin comprometer los valores de la industria.' 
  },
  { 
    title: 'Visión de Carrera', 
    icon: TrendingUp, 
    color: 'from-purple-500 to-violet-600',
    text: 'Visibilidad estratégica hacia gerencias y roles senior (KAM, MSL) en laboratorios multinacionales.' 
  },
];

const ModulePersonalBrand: React.FC<ModulePersonalBrandProps> = ({ onStartChat }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020408] text-slate-200 pb-24">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-medical-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
          >
            <Linkedin size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Módulo L1 · Liderazgo y Carrera</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-editorial font-black text-white mb-6 tracking-tight leading-[0.9] uppercase"
          >
            Marca Personal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 italic font-editorial">& LinkedIn</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            De invisible a referente. Toma el control de cómo te perciben los médicos, los gerentes y el mercado farmacéutico ecuatoriano.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStartChat}
              className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center gap-4 group"
            >
              Construir mi Marca <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── The 5 Pillars ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-editorial font-black text-white uppercase tracking-tight mb-4 italic">Los 5 Pilares Estratégicos</h2>
              <p className="text-slate-500 font-medium leading-relaxed">Tu marca no es un logo; es el valor que el médico y la industria encuentran en ti cada día.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-blue-500 rounded-full" />
              <div className="w-4 h-1 bg-white/10 rounded-full" />
              <div className="w-2 h-1 bg-white/10 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {PILLARS.map((item, idx) => (
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LinkedIn Optimization Preview ── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-editorial font-black text-white uppercase tracking-tight mb-6 italic">Optimización Pro de LinkedIn</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Tu currículum es lo que hiciste. Tu LinkedIn es lo que eres capaz de hacer. Domina el protocolo de las 9 secciones críticas.</p>
            </div>

            <div className="space-y-6">
              {[
                { title: 'Headline Estratégico', text: 'Más que un cargo. Palabras clave que los reclutadores de Pharma buscan en Ecuador.', icon: Target },
                { title: 'Propuesta de Valor (PVP)', text: 'Tu diferenciador en 3 líneas: Quién eres + Qué haces + Factor Diferencial.', icon: FileText },
                { title: 'Estrategia de Contenido 3-1', text: 'Aporta valor constante para que el mercado te encuentre antes de que tú lo busques.', icon: Linkedin },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-blue-500/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
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
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="relative h-full w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 overflow-hidden flex flex-col justify-center items-center text-center">
              <div className="relative w-32 h-32 mb-8 animate-float">
                <Linkedin size={100} className="text-blue-500" />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-lg text-white">
                  <CheckCircle2 size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Perfil de Alto Impacto</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">Audita tu perfil actual y llévatelo al nivel de los líderes de la industria multinacional.</p>
              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">Foto Pro</div>
                <div className="px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">PVP Validada</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparative Case Preview ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div>
            <h2 className="text-3xl font-display font-black text-white uppercase mb-4 tracking-tight">El Valor de la Visibilidad</h2>
            <p className="text-slate-500 font-medium">Dos caminos para una misma carrera. Tú decides cuál tomar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
              <div className="flex items-center gap-3 text-slate-500">
                <Users size={20} />
                <span className="font-black uppercase tracking-widest text-xs">El Visitador Invisible</span>
              </div>
              <h4 className="text-xl font-bold text-white">Espera Oportunidades</h4>
              <p className="text-sm text-slate-500 leading-relaxed italic">"Solo me conocen en mi zona. Si mi laboratorio reduce personal, tengo que empezar de cero enviando CVs fríos que nadie lee."</p>
              <div className="pt-4 text-[10px] font-black uppercase tracking-wider text-slate-600">
                <span>Estado: Reactivo</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20 space-y-6 relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="flex items-center gap-3 text-blue-400">
                <Sparkles size={20} />
                <span className="font-black uppercase tracking-widest text-xs text-blue-400">El Visitador Referente</span>
              </div>
              <h4 className="text-xl font-bold text-white">Atrae Oportunidades</h4>
              <p className="text-sm text-slate-300 leading-relaxed italic font-medium">"Mi LinkedIn es mi vitrina 24/7. Los reclutadores y KOLs me encuentran por mi contenido de valor. Yo gestiono mi futuro."</p>
              <div className="pt-4 text-[10px] font-black uppercase tracking-wider text-blue-500">
                <span>Estado: Estratégico</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-10 relative z-10">
          <Award size={64} className="text-blue-500 mx-auto animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none italic">¿Dejarás que tu marca <br />se construya sola?</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Inicia ahora y diseña la percepción que impulsará tu carrera al siguiente nivel. El mercado te está buscando.
          </p>
          <button 
            onClick={onStartChat}
            className="group relative inline-flex items-center gap-4 px-16 py-7 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-blue-500/60 hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Empezar Módulo L1
            <Play size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModulePersonalBrand;
