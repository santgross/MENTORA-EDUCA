import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, Clock, Gauge, Target, Users,
  ArrowRight, Play, Sparkles, BarChart3, 
  Map, Car, Coffee, Battery
} from 'lucide-react';

interface ModuleFieldProductivityProps {
  onStartChat: () => void;
}

const PRODUCTIVITY_PILLARS = [
  { 
    name: 'Segmentación ABC', 
    icon: Users, 
    color: 'from-emerald-500 to-teal-600',
    desc: 'El 20% de tus médicos genera el 80% de tus resultados. Prioriza con rigor.' 
  },
  { 
    name: 'Ruta en Espiral', 
    icon: Map, 
    color: 'from-blue-500 to-indigo-600',
    desc: 'Optimiza desplazamientos para recuperar hasta 1 hora diaria de vida.' 
  },
  { 
    name: 'Ventana de Oro', 
    icon: Sparkles, 
    color: 'from-amber-400 to-orange-600',
    desc: 'Usa tu pico de energía (7-9 AM) para el médico A más difícil del día.' 
  },
  { 
    name: 'Esperas Activas', 
    icon: Clock, 
    color: 'from-rose-500 to-pink-600',
    desc: 'Convierte el tiempo muerto en micro-producción o aprendizaje acelerado.' 
  },
];

const ModuleFieldProductivity: React.FC<ModuleFieldProductivityProps> = ({ onStartChat }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020408] text-slate-200 pb-24">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 backdrop-blur-xl mb-8"
          >
            <Zap size={14} className="text-yellow-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">Dimensión 6 · Productividad · B1</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-editorial font-black text-white mb-6 tracking-tight leading-[0.9] uppercase"
          >
            Maestría en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 italic font-editorial">Campo</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Ocupado no es lo mismo que productivo. Aprende el sistema que separa al visitador promedio del que domina su territorio con eficiencia quirúrgica.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStartChat}
              className="px-10 py-5 rounded-2xl bg-orange-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-orange-500/20 hover:-translate-y-1 transition-all flex items-center gap-4 group"
            >
              Optimizar Mi Día <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Pillars Section ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-editorial font-black text-white uppercase tracking-tight mb-4 italic">El Sistema B1</h2>
              <p className="text-slate-500 font-medium leading-relaxed">No trabajes más horas; trabaja con más precisión. Estos son los cimientos de tu alto rendimiento sostenible.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTIVITY_PILLARS.map((item, idx) => (
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

      {/* ── Ratio Section ── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-editorial font-black text-white uppercase tracking-tight mb-6 italic">Ratio de Efectividad</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Deja de contar visitas y empieza a contar resultados. ¿Cuántas de tus conversaciones de hoy generaron valor real?</p>
            </div>

            <div className="space-y-4">
              {[
                { t: 'Visita Fallida', d: 'El médico no recibió. Impacto cero, pero consume logística.', c: 'text-red-400' },
                { t: 'Visita de Cortesía', d: '90 segundos de hola y adiós. Sin mensaje científico.', c: 'text-amber-400' },
                { t: 'Visita Efectiva', d: 'Conversación de 3+ min con objetivo y compromiso.', c: 'text-emerald-400' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-orange-500/30 transition-all">
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xs shrink-0 ${item.c}`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base leading-none">{item.t}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 rounded-3xl bg-orange-500/10 border border-orange-500/20">
              <p className="text-orange-400 text-sm font-bold flex items-center gap-2">
                <Target size={16} /> Meta Dr. Medix: ≥ 65% de Efectividad
              </p>
            </div>
          </div>

          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-[100px] animate-pulse" />
            <div className="relative h-full w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 overflow-hidden flex flex-col justify-center items-center text-center">
               <div className="w-32 h-32 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-8 animate-float">
                  <BarChart3 size={64} />
               </div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Medición Real</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">
                 Usa nuestro tracker de 5 días para auditar tu territorio. Los datos te harán libre.
               </p>
               <div className="flex gap-3">
                 <div className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">ABC Analytics</div>
                 <div className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest">Time Audit</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Energy Section ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            <Battery size={48} className="text-orange-500 mx-auto" />
            <h2 className="text-3xl font-editorial font-black text-white uppercase italic tracking-tight">Gestión de la Energía</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Tu energía es el producto que el médico compra. Aprende a llegar a la visita número 8 con la misma presencia que a la primera.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left mt-8">
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <Car size={24} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">Tráfico Estratégico</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Quito y Guayaquil no perdonan la improvisación. Usa los picos para admin y aprendizaje.</p>
               </div>
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <Coffee size={24} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">Pausa Reset</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">La pausa del mediodía es mantenimiento técnico, no un lujo. Restaura tu sistema.</p>
               </div>
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <Gauge size={24} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">KPI de Energía</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Identifica tus valles de energía y ajusta tus visitas C para esos horarios.</p>
               </div>
            </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-10 relative z-10">
          <Zap size={64} className="text-orange-500 mx-auto animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-editorial font-black text-white uppercase tracking-tighter leading-none italic">Domina tu Tiempo <br />Domina tu Territorio</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Abandona el ruido de estar siempre ocupado y entra en la frecuencia del alto rendimiento farmacéutico.
          </p>
          <button 
            onClick={onStartChat}
            className="group relative inline-flex items-center gap-4 px-16 py-7 rounded-[2.5rem] bg-gradient-to-r from-orange-600 to-red-700 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(234,88,12,0.3)] hover:shadow-orange-500/60 hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Entrar a Módulo 16
            <Play size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModuleFieldProductivity;
