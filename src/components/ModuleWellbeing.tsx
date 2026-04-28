import React from 'react';
import { motion } from 'motion/react';
import { 
  Moon, Wind, Heart, Shield, 
  ArrowRight, Play, Sparkles, Brain, 
  Coffee, Dumbbell, Zap, AlertTriangle
} from 'lucide-react';

interface ModuleWellbeingProps {
  onStartChat: () => void;
}

const WELLBEING_PILLARS = [
  { 
    name: 'Sueño Reparador', 
    icon: Moon, 
    color: 'from-blue-500 to-indigo-600',
    desc: '7-9 horas de mantenimiento cognitivo. La base de tu toma de decisiones.' 
  },
  { 
    name: 'Movimiento Activo', 
    icon: Dumbbell, 
    color: 'from-emerald-500 to-teal-600',
    desc: 'Regulador emocional documentado. 30 min diarios cambian tu química cerebral.' 
  },
  { 
    name: 'Conexión Humana', 
    icon: Heart, 
    color: 'from-rose-500 to-pink-600',
    desc: 'Antídoto contra el aislamiento del campo. Cultiva tu red de apoyo real.' 
  },
  { 
    name: 'Propósito Vivo', 
    icon: Zap, 
    color: 'from-amber-400 to-orange-600',
    desc: 'El "porqué" que te sostiene cuando las metas del mes se ponen difíciles.' 
  },
];

const ModuleWellbeing: React.FC<ModuleWellbeingProps> = ({ onStartChat }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020408] text-slate-200 pb-24">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl mb-8"
          >
            <Brain size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Dimensión 6 · Bienestar · B2</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-editorial font-black text-white mb-6 tracking-tight leading-[0.9] uppercase"
          >
            Bienestar <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 italic font-editorial">Sostenible</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            No puedes dar lo que no tienes. Aprende a proteger tu motor humano para construir una carrera de 20 años, no de 4.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStartChat}
              className="px-10 py-5 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-500/20 hover:-translate-y-1 transition-all flex items-center gap-4 group"
            >
              Cuidar Mi Carrera <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Pillars Section ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-editorial font-black text-white uppercase tracking-tight mb-4 italic">Los 4 Cimientos</h2>
              <p className="text-slate-500 font-medium leading-relaxed">El bienestar no es opcional ni es un lujo; es el requerimiento técnico para el alto rendimiento en el campo farmacéutico.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WELLBEING_PILLARS.map((item, idx) => (
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

      {/* ── Burnout Spectrum ── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-editorial font-black text-white uppercase tracking-tight mb-6 italic">El Espectro del Burnout</h2>
              <p className="text-slate-400 text-lg leading-relaxed">El agotamiento no llega de golpe; avisa de a poco. Aprende a intervenir en la Etapa 2 antes de llegar al colapso.</p>
            </div>

            <div className="space-y-4">
              {[
                { t: 'Etapa 1: Funcional', d: 'Alta energía, riesgo silencioso si no hay pausas reales.', c: 'text-blue-400' },
                { t: 'Etapa 2: Alerta', d: 'Irritabilidad, cansancio que no se va el domingo.', c: 'text-yellow-400' },
                { t: 'Etapa 3: Deterioro', d: 'Cinismo, síntomas físicos, baja calidad de visita.', c: 'text-orange-400' },
                { t: 'Etapa 4: Colapso', d: 'Incapacidad de funcionar. Requiere intervención profesional.', c: 'text-red-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-indigo-500/30 transition-all">
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
          </div>

          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[100px] animate-pulse" />
            <div className="relative h-full w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 overflow-hidden flex flex-col justify-center items-center text-center">
               <div className="w-32 h-32 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-8 animate-float">
                  <Wind size={64} />
               </div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Protocolo de Desconexión</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">
                 Silencia el WhatsApp laboral y establece límites con el gerente sin culpa. Tu descanso es sagrado.
               </p>
               <div className="flex gap-3">
                 <div className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">Self-Care KPI</div>
                 <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest">Mental Health</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Boundaries Section ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            <Shield size={48} className="text-indigo-500 mx-auto" />
            <h2 className="text-3xl font-editorial font-black text-white uppercase italic tracking-tight">Cultura de Autocuidado</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Pedir ayuda no es debilidad; es la respuesta profesional ante un problema que supera tus herramientas actuales. En Dr. Medix, priorizamos al humano.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <Coffee size={24} className="text-indigo-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">Desconexión Real</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Tu disponibilidad termina cuando cierras el CRM. Sin culpas, sin mensajes de 10 PM.</p>
               </div>
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <AlertTriangle size={24} className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">Señales de Alerta</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Identifica tus activadores personales de estrés y activa tu protocolo de recuperación Nivel 2.</p>
               </div>
            </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-10 relative z-10">
          <Sparkles size={64} className="text-indigo-500 mx-auto animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-editorial font-black text-white uppercase tracking-tighter leading-none italic">El Fundamento de <br />Todo lo Demás</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Un visitador sostenible es un visitador imparable. Entra al módulo final y completa tu formación integral en Dr. Medix.
          </p>
          <button 
            onClick={onStartChat}
            className="group relative inline-flex items-center gap-4 px-16 py-7 rounded-[2.5rem] bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-indigo-500/60 hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Entrar a Módulo 17
            <Play size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModuleWellbeing;
