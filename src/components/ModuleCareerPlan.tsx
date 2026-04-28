import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, Map, Target, TrendingUp, 
  ArrowRight, Play, Sparkles, Briefcase, 
  MapPin, Rocket, Shield
} from 'lucide-react';

interface ModuleCareerPlanProps {
  onStartChat: () => void;
}

const CAREER_TRAYECTORIAS = [
  { 
    name: 'Comercial Vertical', 
    icon: TrendingUp, 
    color: 'from-blue-500 to-indigo-600',
    desc: 'Visitador -> KAM -> Gerente de Zona. La ruta para maestros de la negociación.' 
  },
  { 
    name: 'Medical Affairs', 
    icon: Shield, 
    color: 'from-emerald-500 to-teal-600',
    desc: 'Visitador Especializado -> MSL. Para quienes aman la ciencia y los KOLs.' 
  },
  { 
    name: 'Marketing/Estrategia', 
    icon: Target, 
    color: 'from-rose-500 to-pink-600',
    desc: 'Product Manager -> Brand Manager. El cerebro detrás de la marca.' 
  },
  { 
    name: 'Independencia', 
    icon: Rocket, 
    color: 'from-amber-400 to-orange-600',
    desc: 'Distribución Independiente. Para emprendedores con red médica propia.' 
  },
];

const ModuleCareerPlan: React.FC<ModuleCareerPlanProps> = ({ onStartChat }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020408] text-slate-200 pb-24">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl mb-8"
          >
            <Compass size={14} className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Dimensión 5 · Liderazgo · L2</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-editorial font-black text-white mb-6 tracking-tight leading-[0.9] uppercase"
          >
            Arquitecto de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 italic font-editorial">Tu Carrera</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Tu carrera no es un accidente; es un proyecto estratégico. Diseña tu mapa a 5 años y toma el control de tu evolución en la industria farmacéutica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStartChat}
              className="px-10 py-5 rounded-2xl bg-amber-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-amber-500/20 hover:-translate-y-1 transition-all flex items-center gap-4 group"
            >
              Diseñar Mi Futuro <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Paths Section ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-editorial font-black text-white uppercase tracking-tight mb-4 italic">Las 4 Trayectorias</h2>
              <p className="text-slate-500 font-medium leading-relaxed">Elige tu destino antes de que el mercado elija por ti. Cada ruta en Ecuador requiere un set de habilidades único.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_TRAYECTORIAS.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-3 leading-tight">
                  {item.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium group-hover:text-slate-400 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formula Section ── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square order-2 lg:order-1">
            <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-[100px] animate-pulse" />
            <div className="relative h-full w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 overflow-hidden flex flex-col justify-center items-center text-center">
               <div className="w-32 h-32 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-8 animate-float">
                  <Sparkles size={64} />
               </div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">La Fórmula del Avance</h3>
               <p className="font-mono text-amber-400 text-lg mb-6">Rendimiento × Visibilidad × Red × Momento</p>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">
                 Si uno de los factores es cero, el resultado es cero. El rendimiento es solo el umbral; los otros factores son tus multiplicadores.
               </p>
               <div className="flex gap-3">
                 <div className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest">Visibility L1</div>
                 <div className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">Network Strategy</div>
               </div>
            </div>
          </div>

          <div className="space-y-12 order-1 lg:order-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-editorial font-black text-white uppercase tracking-tight mb-6 italic">Mapa de Brecha</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Conecta tu punto actual con tu destino a 5 años. Identifica qué te falta hoy para ser el candidato ideal mañana.</p>
            </div>

            <div className="space-y-4">
              {[
                { s: 'Año 1', t: 'Consolidación Senior', d: 'Visibilidad interna y marcas de excelencia.' },
                { s: 'Año 2', t: 'Cierre de Brechas', d: 'Inglés, Posgrados o Habilidades Digitales.' },
                { s: 'Año 3', t: 'Transición de Rol', d: 'Primer paso hacia KAM, MSL o PM.' },
                { s: 'Año 4', t: 'Liderazgo Activo', d: 'Mentoring y gestión de proyectos especiales.' },
                { s: 'Año 5', t: 'Consolidación Destino', d: 'Dominio de la posición aspiracional.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-amber-500/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-0.5 block">{item.s}</span>
                    <h4 className="font-bold text-white text-base leading-none">{item.t}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ikigai Section ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            <Map size={48} className="text-amber-500 mx-auto" />
            <h2 className="text-3xl font-editorial font-black text-white uppercase italic tracking-tight">Tu Ikigai Profesional</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              No busques solo el mejor sueldo; busca la intersección de tu pasión, tu talento, el valor de mercado y la necesidad de la industria.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <Briefcase size={24} className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">PDP 90 Días</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Plan de Desarrollo Profesional. Habilidades, experiencias y red. Lo que harás esta semana por tu futuro.</p>
               </div>
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <MapPin size={24} className="text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">Estrategia Ecuador</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Alinea tus ambiciones con las realidades de Quito, Guayaquil y el canal institucional (IESS/MSP).</p>
               </div>
            </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-10 relative z-10">
          <Compass size={64} className="text-amber-500 mx-auto animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-editorial font-black text-white uppercase tracking-tighter leading-none italic">Deja de Esperar <br />Empieza a Diseñar</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            La carrera intencional es el único seguro contra la obsolescencia. Conviértete en el arquitecto de tu trayectoria en el ecosistema Dr. Medix.
          </p>
          <button 
            onClick={onStartChat}
            className="group relative inline-flex items-center gap-4 px-16 py-7 rounded-[2.5rem] bg-gradient-to-r from-amber-600 to-orange-700 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(217,119,6,0.3)] hover:shadow-amber-500/60 hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Entrar a Módulo 15
            <Play size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModuleCareerPlan;
