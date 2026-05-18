import React from 'react';
import { motion } from 'motion/react';
import { Shield, Brain, Star, ChevronRight } from 'lucide-react';

interface PhaseTransitionProps {
  userName: string;
  onContinue: () => void;
}

const FASE1_MODULOS = [
  { num: 1, label: 'Ecosistema Farmacéutico' },
  { num: 2, label: 'Anatomía y Fisiología' },
  { num: 3, label: 'Farmacología Estratégica' },
  { num: 4, label: 'Normativa ARCSA/MSP' },
  { num: 5, label: 'Ética y COÉTICA' },
  { num: 6, label: 'El Visitador Moderno' },
  { num: 7, label: 'Técnicas de Visita' },
  { num: 8, label: 'Manejo de Objeciones' },
  { num: 9, label: 'E-Detailing Digital' },
  { num: 10, label: 'Farmacovigilancia' },
];

const FASE2_MODULOS = [
  { num: 11, label: 'Plan de Carrera', icon: '🧭' },
  { num: 12, label: 'Inteligencia Emocional', icon: '🧠' },
  { num: 13, label: 'Productividad en Campo', icon: '⚡' },
  { num: 14, label: 'Relaciones Duraderas', icon: '🤝' },
  { num: 15, label: 'Marca Personal', icon: '🌟' },
  { num: 16, label: 'Resiliencia', icon: '🛡️' },
  { num: 17, label: 'Bienestar', icon: '💚' },
];

const PhaseTransition: React.FC<PhaseTransitionProps> = ({ userName, onContinue }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#020408] relative overflow-hidden p-6">

      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-medical-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl w-full relative z-10">

        {/* Badge de logro */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-medical-500 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-medical-500 to-indigo-600 flex items-center justify-center shadow-2xl border border-white/10">
              <Shield size={44} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center border-2 border-[#020408]">
              <Star size={14} className="text-white fill-white" />
            </div>
          </div>
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <p className="text-medical-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            🎉 FASE 1 COMPLETADA
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
            {userName}, completaste<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-400 to-indigo-400">
              la base técnica
            </span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto">
            Los primeros 10 módulos te convirtieron en un experto del ecosistema farmacéutico ecuatoriano. 
            Ahora comienza la segunda fase: <strong className="text-white">el profesional completo</strong>.
          </p>
        </motion.div>

        {/* Comparación de fases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {/* Fase 1 */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-medical-500" />
              <span className="text-[10px] font-black text-medical-400 uppercase tracking-widest">Fase 1 — Completada</span>
            </div>
            <div className="space-y-1.5">
              {FASE1_MODULOS.map(m => (
                <div key={m.num} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-medical-500/20 border border-medical-500/40 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-medical-500" />
                  </div>
                  <span className="text-[11px] text-slate-500 line-through">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fase 2 */}
          <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Fase 2 — Desbloqueada</span>
            </div>
            <div className="space-y-1.5">
              {FASE2_MODULOS.map(m => (
                <div key={m.num} className="flex items-center gap-2">
                  <span className="text-sm">{m.icon}</span>
                  <span className="text-[11px] text-slate-300 font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mensaje del Dr. Medix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-8 flex gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-medical-500/10 border border-medical-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <Brain size={20} className="text-medical-400" />
          </div>
          <div>
            <p className="text-[11px] font-black text-medical-400 uppercase tracking-widest mb-2">Dr. Medix dice:</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              "El conocimiento técnico abre la puerta. Pero lo que determina si tienes una carrera de 2 años 
              o de 20 es esto: <strong className="text-white">quién eres como profesional</strong>. 
              La Fase 2 no es un bonus — es la mitad más importante del programa."
            </p>
          </div>
        </motion.div>

        {/* Botón continuar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center"
        >
          <button
            onClick={onContinue}
            className="group flex items-center gap-4 px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black uppercase tracking-widest text-xs shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all active:scale-95"
          >
            <span>Comenzar Fase 2</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default PhaseTransition;
