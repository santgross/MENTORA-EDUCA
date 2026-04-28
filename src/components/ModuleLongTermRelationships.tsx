import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, Heart, Handshake, ShieldCheck, 
  Award, ArrowRight, Play, Sparkles, Target,
  UserCheck, Scale
} from 'lucide-react';

interface ModuleLongTermRelationshipsProps {
  onStartChat: () => void;
}

const TRUST_VARIABLES = [
  { 
    name: 'Credibilidad', 
    icon: Award, 
    color: 'from-blue-500 to-indigo-600',
    desc: 'Tu conocimiento científico y rigor técnico. ¿Creen que sabes de lo que hablas?' 
  },
  { 
    name: 'Confiabilidad', 
    icon: ShieldCheck, 
    color: 'from-emerald-500 to-teal-600',
    desc: 'Cumplir lo prometido. Ser consistente en el tiempo. Tu palabra es tu contrato.' 
  },
  { 
    name: 'Intimidad', 
    icon: Heart, 
    color: 'from-rose-500 to-pink-600',
    desc: 'La seguridad que siente el médico para compartir sus retos y dudas reales contigo.' 
  },
  { 
    name: 'Orientación al Tú', 
    icon: UserCheck, 
    color: 'from-amber-400 to-orange-600',
    desc: 'Poner el interés del médico y sus pacientes por encima de tu meta mensual.' 
  },
];

const ModuleLongTermRelationships: React.FC<ModuleLongTermRelationshipsProps> = ({ onStartChat }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020408] text-slate-200 pb-24">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-xl mb-8"
          >
            <Handshake size={14} className="text-teal-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Módulo 14 · Socio de Confianza</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-editorial font-black text-white mb-6 tracking-tight leading-[0.9] uppercase"
          >
            Relaciones <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-500 to-cyan-400 italic font-editorial">Imperecederas</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Una visita crea una transacción. Una relación crea un socio. Aprende el arte sistemático de construir confianza real en el ecosistema farmacéutico.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStartChat}
              className="px-10 py-5 rounded-2xl bg-teal-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-teal-500/20 hover:-translate-y-1 transition-all flex items-center gap-4 group"
            >
              Construir Confianza <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Equation ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-editorial font-black text-white uppercase tracking-tight mb-4 italic">La Ecuación de Maister</h2>
              <p className="text-slate-500 font-medium leading-relaxed">La confianza no es un misticismo; es una fórmula matemática de comportamiento. Domina las variables para escalar tus vínculos.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_VARIABLES.map((item, idx) => (
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

      {/* ── Journey Stages ── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-editorial font-black text-white uppercase tracking-tight mb-6 italic">Las 5 Etapas del Ciclo</h2>
              <p className="text-slate-400 text-lg leading-relaxed">Desde el "buenos días" en recepción hasta el simposio compartido. Identifica dónde estás con cada médico de tu territorio.</p>
            </div>

            <div className="space-y-4">
              {[
                { s: 'Etapa 1', t: 'Desconocido', d: 'Conseguir la segunda visita, no la receta.' },
                { s: 'Etapa 2', t: 'Conocido', d: 'Validar credibilidad y consistencia.' },
                { s: 'Etapa 3', t: 'Prescriptor', d: 'Consolidación de la confianza técnica.' },
                { s: 'Etapa 4', t: 'Socio Consultivo', d: 'El médico te contacta para resolver dudas.' },
                { s: 'Etapa 5', t: 'Embajador', d: 'Recomienda tu solución a sus colegas.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-teal-500/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-500 mb-0.5 block">{item.s}</span>
                    <h4 className="font-bold text-white text-base leading-none">{item.t}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-teal-500/5 rounded-full blur-[100px] animate-pulse" />
            <div className="relative h-full w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-12 overflow-hidden flex flex-col justify-center items-center text-center">
               <div className="w-32 h-32 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-8 animate-float">
                  <Users size={64} />
               </div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Mapeo del Territorio</h3>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">
                 Audita tu portafolio actual. ¿Cuántos de tus médicos son transaccionales y cuántos son socios reales?
               </p>
               <div className="flex gap-3">
                 <div className="px-4 py-2 rounded-lg bg-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest">KOL Strategy</div>
                 <div className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Crisis Reset</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ethics Section ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
            <Scale size={48} className="text-teal-500 mx-auto" />
            <h2 className="text-3xl font-editorial font-black text-white uppercase italic tracking-tight">Ética y COÉTICA</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              La confianza sin integridad es manipulación. Aprende a gestionar KOLs y relaciones de alto impacto dentro de los marcos regulatorios de Ecuador.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 group">
                  <Sparkles size={24} className="text-teal-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-black text-white uppercase tracking-widest text-sm mb-2">Relación Genuina</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Aportas valor científico, resuelves dudas de pacientes y mantienes consistencia ética de largo plazo.</p>
               </div>
               <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 opacity-50 group grayscale hover:grayscale-0 transition-all">
                  <Target size={24} className="text-slate-500 mb-4" />
                  <h4 className="font-black text-slate-400 uppercase tracking-widest text-sm mb-2 text-decoration-line-through">Incentivo Indebido</h4>
                  <p className="text-xs text-slate-600 leading-relaxed italic">"Colaboraciones" que esconden pagos por receta. Destruye tu carrera y la reputación del laboratorio.</p>
               </div>
            </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-10 relative z-10">
          <Handshake size={64} className="text-teal-500 mx-auto animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-editorial font-black text-white uppercase tracking-tighter leading-none italic">Construye lo <br />que nadie puede comprar</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Abandona la visita transaccional y conviértete en el socio de confianza que el médico espera. Tu capital relacional es tu mayor activo.
          </p>
          <button 
            onClick={onStartChat}
            className="group relative inline-flex items-center gap-4 px-16 py-7 rounded-[2.5rem] bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(13,148,136,0.3)] hover:shadow-teal-500/60 hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Entrar a Módulo 14
            <Play size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModuleLongTermRelationships;
