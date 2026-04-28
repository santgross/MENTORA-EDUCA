import React from 'react';
import { motion } from 'motion/react';
import { 
  Flame, Shield, Zap, Heart, Activity, 
  Tablets, UserX, Globe, Trophy,
  Play, Search, Brain,
  ArrowRight, Clock
} from 'lucide-react';

interface ModuleResilienceProps {
  onStartChat: () => void;
}

const REJECTION_TYPES = [
  { type: 'Tipo 1', name: 'Rechazo de Acceso', icon: Clock, color: 'from-blue-500 to-indigo-600', desc: 'No te recibe o cancela.' },
  { type: 'Tipo 2', name: 'Rechazo del Producto', icon: Tablets, color: 'from-amber-400 to-orange-600', desc: 'Prefiere la competencia.' },
  { type: 'Tipo 3', name: 'Rechazo Personal', icon: UserX, color: 'from-rose-500 to-pink-600', desc: 'Hostilidad o mala actitud.' },
  { type: 'Tipo 4', name: 'Rechazo Sistémico', icon: Globe, color: 'from-emerald-500 to-teal-600', desc: 'Formulario o CNMB.' },
];

const ModuleResilience: React.FC<ModuleResilienceProps> = ({ onStartChat }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020408] text-slate-200 pb-24">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-medical-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-xl mb-8"
          >
            <Flame size={14} className="text-red-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Dimensión 4 · Resiliencia · IE2</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-accent font-black text-white mb-6 tracking-tight leading-[0.9] uppercase"
          >
            El Visitador <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 italic font-accent">Antifrágil</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Mil rechazos al año son una certeza. Lo que hagas en los 5 minutos después es lo único que define tu futuro en esta industria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onStartChat}
              className="px-10 py-5 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-red-500/20 hover:-translate-y-1 transition-all flex items-center gap-4 group"
            >
              Forjar mi Resiliencia <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Rejection Types ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-editorial font-black text-white uppercase tracking-tight mb-4 italic">Anatomía del Rechazo</h2>
              <p className="text-slate-500 font-medium leading-relaxed">No todo rechazo duele igual porque no todo rechazo significa lo mismo. Clasifica antes de sentir.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REJECTION_TYPES.map((item, idx) => (
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
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">{item.type}</span>
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

      {/* ── Protocol Section ── */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-500/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none mb-8 italic">
                  Protocolo <br />PCER
                </h2>
                <div className="space-y-8">
                  {[
                    { l: 'P', t: 'Parar', d: '60 segundos de silencio. Deja que la amígdala se enfríe.', icon: Zap },
                    { l: 'C', t: 'Clasificar', d: '¿Acceso, producto, personal o sistémico?', icon: Search },
                    { l: 'E', t: 'Extraer', d: '¿Qué información estratégica contiene este rechazo?', icon: Brain },
                    { l: 'R', t: 'Redirigir', d: '¿Cuál es el próximo paso específico con este médico?', icon: Trophy },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500 font-display font-black text-xl shrink-0 group-hover:scale-110 transition-transform">
                        {item.l}
                      </div>
                      <div>
                        <h4 className="font-black text-white uppercase tracking-widest text-sm mb-1">{item.t}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="aspect-square bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center text-center">
                <Shield size={80} className="text-red-500 mx-auto mb-8 animate-pulse" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">Cinto de Seguridad Emocional</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Aplica PCER en los primeros 5 minutos después de una visita difícil y transforma el veneno en medicina estratégica.
                </p>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-red-500/40" />
                  <div className="w-2 h-2 rounded-full bg-red-500/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Resilience Sources ── */}
      <section className="py-20 px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-4">Las 3 Fuentes de Resiliencia</h2>
            <p className="text-slate-500 font-medium">Basado en el modelo de Edith Grotberg.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-8">
                <Shield size={32} />
              </div>
              <h4 className="text-lg font-black text-white uppercase mb-4 tracking-widest">Yo Tengo</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">Recursos externos: Un mentor, un laboratorio sólido, acceso a formación pro como Dr. Medix.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400 mx-auto mb-8">
                <Heart size={32} />
              </div>
              <h4 className="text-lg font-black text-white uppercase mb-4 tracking-widest">Yo Soy</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">IDENTIDAD: Soy un profesional de la salud, no un mendigo de recetas. Mis valores son inquebrantables.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-8">
                <Activity size={32} />
              </div>
              <h4 className="text-lg font-black text-white uppercase mb-4 tracking-widest">Yo Puedo</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">HABILIDAD: Puedo regular mis emociones, aprender del error y redirigir mi estrategia en 5 minutos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Antifragile Principle ── */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
               <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest">Principio Taleb</span>
               <h2 className="text-3xl font-editorial font-black text-white uppercase leading-tight italic tracking-tighter">Más que Resistir: <br />Mejorar con el Estrés</h2>
               <p className="text-slate-400 font-medium">El visitador promedio sobrevive al campo. El visitador antifrágil sale de cada rechazo con más información que el que no fue rechazado.</p>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                <h5 className="font-bold text-white mb-2 text-sm uppercase tracking-widest">Resistente</h5>
                <p className="text-xs text-slate-500 font-medium italic">Agita, pero no se rompe. (Un vaso de plástico)</p>
              </div>
              <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                <h5 className="font-bold text-orange-400 mb-2 text-sm uppercase tracking-widest">Antifrágil</h5>
                <p className="text-xs text-slate-300 font-medium italic">El estrés lo fortalece. (Un músculo después del gimnasio)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final Challenge ── */}
      <section className="py-24 px-8 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto space-y-10 relative z-10">
          <Flame size={64} className="text-red-500 mx-auto animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none italic">¿Dejarás que el campo <br />te rompa o te forje?</h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Asume el reto de la racha difícil. Aprende a rebotar más alto en cada golpe. El éxito en esta industria es un juego de supervivencia mental.
          </p>
          <button 
            onClick={onStartChat}
            className="group relative inline-flex items-center gap-4 px-16 py-7 rounded-[2.5rem] bg-gradient-to-r from-red-600 to-orange-700 text-white font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:shadow-red-500/60 hover:-translate-y-2 transition-all active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Activar Módulo IE2
            <Play size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModuleResilience;
