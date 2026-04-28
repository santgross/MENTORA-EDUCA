import React, { useState } from 'react';
import { UserProfile, UserLevel } from '../types';
import {
  ArrowRight, CheckCircle2,
  Sparkles, Trophy, Zap, ChevronRight, Star, Lock, Info, Target, Layout, Building2, Globe, PlayCircle, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModuleZeroProps {
  user: UserProfile;
  onComplete: (updatedUser: UserProfile) => void;
}

const CARDS_NOVATO = [
  { icon: Layout, title: '¿Qué es MENTORA EDUCA?', text: 'Tu puerta de entrada a la industria farmacéutica en Ecuador. El Dr. Medix — tu mentor con IA — te guiará desde los fundamentos hasta tu primera certificación. No necesitas experiencia previa.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Target, title: '¿Cómo vas a aprender?', text: 'Microlecciones de 1–3 min, casos clínicos reales del Ecuador, simulaciones de visita médica, tarjetas tipo Anki y un mentor IA disponible 24/7 que se adapta a tu ritmo.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: Globe, title: 'La industria te espera', text: 'Más de 8.000 visitadores médicos trabajan en Ecuador. Laboratorios como Bayer, Pfizer, LIFE y Difare contratan continuamente. Salario de entrada: $800–$1.500/mes + comisiones.', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Sparkles, title: 'Primer paso: Diagnóstico', text: 'Haré un diagnóstico rápido de tus conocimientos actuales. No califica — solo me permite ajustar tu ruta para que aprendas exactamente lo que necesitas, al ritmo correcto.', color: 'text-purple-500', bg: 'bg-purple-50' },
];

const CARDS_EXPERIMENTADO = [
  { icon: Trophy, title: 'Bienvenido a la Ruta Pro', text: 'Diseñada para visitadores con experiencia que buscan el siguiente nivel: KAM, Gerente de Producto, especialista terapéutico o acceso a laboratorios multinacionales.', color: 'text-medical-600', bg: 'bg-medical-50' },
  { icon: Zap, title: 'Contenido avanzado real', text: 'Lectura crítica de ensayos clínicos, modelo Challenger Sale, farmaceconomía para comités IESS/MSP, psicología cognitiva avanzada y simulaciones con perfiles reales.', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Building2, title: 'El mercado Pro en Ecuador', text: 'KAMs ganan $2.500–$5.000/mes + vehículo + seguro. Gerentes de Producto en multinacionales: $3.000–$6.000/mes. Laboratorios Bagó, Eurofarma y Roche buscan perfiles certificados.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Target, title: 'Tu Diagnóstico Avanzado', text: 'El diagnóstico PRO evalúa tu nivel en: estrategia de territorio, farmacología avanzada y ética profesional. Con los resultados diseñamos exactamente qué profundizar.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

// Re-using the diagnostic data from the previous version but with better UI

const DIAGNOSTIC_NOVATO = [
  { title: 'Ecosistema Farmacéutico Ecuador', questions: [
    { text: '¿Cuál es la función principal de un Visitador Médico en Ecuador?', options: [
      { text: 'Educar a médicos sobre productos farmacéuticos con información científica veraz', points: 4 },
      { text: 'Vender medicamentos directamente al público en farmacias', points: 0 },
      { text: 'Distribuir productos a hospitales y bodegas del MSP', points: 1 },
    ]},
    { text: '¿Qué entidad otorga los registros sanitarios a medicamentos en Ecuador?', options: [
      { text: 'El Ministerio de Salud Pública (MSP)', points: 2 },
      { text: 'El IESS (Instituto Ecuatoriano de Seguridad Social)', points: 0 },
      { text: 'ARCSA (Agencia Nacional de Regulación, Control y Vigilancia Sanitaria)', points: 4 },
    ]},
    { text: '¿Qué es el CNMB en Ecuador?', options: [
      { text: 'Un certificado de estudios médicos para visitadores', points: 0 },
      { text: 'El Cuadro Nacional de Medicamentos Básicos — lista de medicamentos esenciales del MSP', points: 4 },
      { text: 'Un sistema de compras centralizado del IESS', points: 1 },
    ]},
  ]},
  { title: 'Farmacología y Ciencias Básicas', questions: [
    { text: '"Farmacocinética" estudia principalmente:', options: [
      { text: 'Cómo el medicamento actúa sobre los receptores del cuerpo', points: 0 },
      { text: 'Cómo el cuerpo procesa un medicamento: absorción, distribución, metabolismo y excreción', points: 4 },
      { text: 'La comparación de precios entre medicamentos del mercado', points: 0 },
    ]},
    { text: '¿Qué significa que un medicamento sea "genérico"?', options: [
      { text: 'Es un medicamento de menor calidad fabricado localmente', points: 0 },
      { text: 'Es un medicamento sin registro sanitario aprobado', points: 0 },
      { text: 'Es una copia del original cuya patente expiró, con bioequivalencia demostrada', points: 4 },
    ]},
  ]},
];

const DIAGNOSTIC_EXPERIMENTADO = [
  { title: 'Estrategia de Territorio y KPIs', questions: [
    { text: 'Alto volumen de pacientes pero prescribe solo a la competencia. ¿En qué cuadrante está y qué estrategia aplicas?', options: [
      { text: 'Cuadrante 1 (Estrella) — mantenerlo con visitas frecuentes de refuerzo', points: 0 },
      { text: 'Cuadrante 4 (Bajo rendimiento) — reasignar el tiempo a médicos más rentables', points: 0 },
      { text: 'Cuadrante 2 (Objetivo Prioritario) — convertirlo identificando su barrera específica de adopción', points: 4 },
    ]},
    { text: 'Tu tasa de conversión C2→C1 tarda 10 visitas cuando el benchmark es 5. ¿Qué analiza primero?', options: [
      { text: 'Si el mensaje, la selección de paciente ideal o el perfil DISC está desalineado con mi enfoque', points: 4 },
      { text: 'Que mis médicos de territorio son más difíciles que el promedio de la industria', points: 0 },
      { text: 'Que necesito más muestras y materiales de impacto visual', points: 1 },
    ]},
  ]},
  { title: 'Farmacología Avanzada y Evidencia Clínica', questions: [
    { text: 'Un médico señala que el EMPA-REG tiene limitaciones porque el 99% tenía ECV establecida. ¿Qué responde el visitador experto?', options: [
      { text: '"No, el diseño del estudio es sólido y sus resultados son concluyentes para todos los perfiles"', points: 0 },
      { text: '"Tiene razón, es una limitación real. Para prevención primaria, el DECLARE-TIMI 58 mostró HR 0,73 para hospitalizaciones por IC"', points: 4 },
      { text: 'Cambias de tema hacia los beneficios cardiovasculares sin responder la objeción', points: 0 },
    ]},
  ]},
];

function getResults(score: number, maxScore: number, isPro: boolean) {
  const pct = Math.round((score / maxScore) * 100);
  if (isPro) {
    if (pct >= 80) return { title: 'Nivel Experto Confirmado', icon: Trophy, msg: 'Dominas los conceptos avanzados. Tu Ruta Pro se enfocará en los módulos de mayor valor estratégico para tu carrera.', xpBonus: 400, badge: 'Visitador Senior' };
    if (pct >= 55) return { title: 'Sólido con brechas específicas', icon: Zap, msg: 'Buena base en estrategia y farmacología. Tu Ruta Pro irá directo a las áreas donde más puedes crecer.', xpBonus: 250, badge: 'Profesional en Ascenso' };
    return { title: 'Experiencia + formación = diferencia', icon: Target, msg: 'Tu experiencia práctica es valiosa. El programa te dará el framework teórico avanzado que potenciará lo que ya sabes.', xpBonus: 150, badge: 'Potencial Alto' };
  } else {
    if (pct >= 75) return { title: '¡Excelente base de conocimientos!', icon: Sparkles, msg: 'Tienes un conocimiento inicial muy sólido. Tu ruta Novato incluirá desafíos adicionales desde el M1.', xpBonus: 150, badge: 'Talento Natural' };
    if (pct >= 45) return { title: 'Buen punto de partida', icon: BookOpen, msg: 'Tienes conocimientos básicos en varias áreas. Tu ruta Novato te llevará paso a paso por todo lo que necesitas.', xpBonus: 75, badge: 'Estudiante Motivado' };
    return { title: 'El viaje empieza aquí', icon: PlayCircle, msg: 'Estás en el lugar correcto. Tu ruta Novato está diseñada exactamente para ti — construiremos todo desde cero con solidez.', xpBonus: 50, badge: 'Nuevo en el Campo' };
  }
}

const ModuleZero: React.FC<ModuleZeroProps> = ({ user, onComplete }) => {
  const [stage, setStage] = useState<'welcome'|'cards'|'intro'|'diagnostic'|'results'>('welcome');
  const [currentCard, setCurrentCard] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number|null>(null);
  const [answered, setAnswered] = useState(false);

  React.useEffect(() => {
    const container = document.getElementById('module-zero-container');
    if (container) container.scrollTop = 0;
  }, [stage]);

  const isPro = user.level === UserLevel.EXPERIMENTADO;
  const cards = isPro ? CARDS_EXPERIMENTADO : CARDS_NOVATO;
  const diagnostic = isPro ? DIAGNOSTIC_EXPERIMENTADO : DIAGNOSTIC_NOVATO;

  const allQuestions = diagnostic.flatMap(s => s.questions);
  const maxScore = allQuestions.reduce((acc, q) => acc + Math.max(...q.options.map(o => o.points)), 0);
  const currentSectionData = diagnostic[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];
  const totalAnswered = diagnostic.slice(0, currentSection).reduce((a, s) => a + s.questions.length, 0) + currentQuestion;
  const totalQ = allQuestions.length;
  const progress = Math.round((totalAnswered / totalQ) * 100);

  const handleAnswer = (idx: number, points: number) => {
    if (answered) return;
    setSelectedIdx(idx);
    setAnswered(true);
    setScore(p => p + points);
    setTimeout(() => {
      setSelectedIdx(null); setAnswered(false);
      const nextQ = currentQuestion + 1;
      if (nextQ < currentSectionData.questions.length) {
        setCurrentQuestion(nextQ);
      } else {
        const nextS = currentSection + 1;
        if (nextS < diagnostic.length) { setCurrentSection(nextS); setCurrentQuestion(0); }
        else setStage('results');
      }
    }, 1150);
  };

  const handleComplete = () => {
    const results = getResults(score, maxScore, isPro);
    onComplete({ ...user, xp: user.xp + results.xpBonus, completedModules: [0], badges: [results.badge] });
  };

  return (
    <div className="min-h-screen bg-[#020408] flex justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.08, 0.03],
            x: [0, 40, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.02, 0.06, 0.02],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div id="module-zero-container" className="w-full max-w-6xl max-h-screen overflow-y-auto custom-scrollbar relative z-10 flex flex-col pt-4 pb-12 px-6 scroll-smooth">
        <AnimatePresence mode="wait">
          {/* WELCOME */}
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-5xl glass-card p-10 rounded-[2.5rem] border border-white/5 mx-auto flex flex-col lg:flex-row items-center gap-12"
            >
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="relative w-16 h-16 mb-6 mx-auto lg:mx-0">
                  <div className="absolute inset-0 bg-medical-500 blur-2xl opacity-20 animate-pulse" />
                  <div className="relative w-full h-full rounded-2xl bg-white/5 flex items-center justify-center text-medical-400 text-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
                    {isPro ? <Trophy size={32} className="animate-float" /> : <Star size={32} className="animate-float" />}
                  </div>
                </div>

                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 text-medical-400 text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/5 backdrop-blur-md">
                  {isPro ? 'Ruta Avanzada' : 'Ruta Inicial'}
                </div>

                <h1 className="text-4xl lg:text-5xl font-editorial font-bold text-white mb-6 tracking-tight leading-tight">
                  Hola, <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-400 to-blue-400 italic font-editorial">{user.name.split(' ')[0]}</span>
                </h1>

                <p className="text-slate-400 text-base leading-relaxed mb-8 font-medium max-w-md mx-auto lg:mx-0">
                  {isPro
                    ? 'Tu diagnóstico avanzado está listo. Evaluaremos tus conocimientos clave para personalizar tu ruta.'
                    : 'Bienvenido. Antes de empezar, haré un diagnóstico rápido para ajustar tu programa de aprendizaje.'}
                </p>
              </div>

              <div className="lg:w-1/2 w-full space-y-8">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Preguntas', value: isPro ? '11' : '13', icon: Info },
                    { label: 'Áreas', value: '3', icon: Layout },
                    { label: 'Tiempo', value: isPro ? '~8m' : '~6m', icon: Zap }
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/5 p-6 rounded-3xl border border-white/5 group transition-colors hover:bg-white/[0.08]">
                      <div className="text-white font-bold text-2xl leading-none mb-2 group-hover:scale-105 transition-transform">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <button onClick={() => setStage('cards')} className="btn-primary w-full py-6 text-sm font-bold rounded-2xl group shadow-2xl transition-all hover:scale-[1.02]">
                    Comenzar Diagnóstico <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={handleComplete} 
                    className="w-full py-3 text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
                  >
                    Saltar e ir al Módulo 1 
                    <Zap size={14} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* CARDS */}
          {stage === 'cards' && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-5xl relative z-10 mx-auto"
            >
              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-3xl flex flex-col lg:flex-row min-h-[500px]">
                <div className="lg:w-2/5 bg-gradient-to-br from-medical-600/20 to-blue-600/20 p-12 flex flex-col items-center justify-center gap-8 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-medical-500/5 blur-3xl opacity-30" />
                  <div className="relative w-24 h-24 rounded-3xl bg-white/5 backdrop-blur-xl flex items-center justify-center text-white border border-white/10 shadow-2xl">
                    {React.createElement(cards[currentCard].icon, { size: 48, className: "animate-float" })}
                  </div>
                  <div className="relative space-y-4">
                    <h3 className="text-3xl font-display font-bold text-white text-center leading-tight uppercase">{cards[currentCard].title}</h3>
                    <div className="flex justify-center gap-2">
                      {cards.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentCard ? 'w-10 bg-medical-500' : 'w-2 bg-white/10'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-3/5 p-12 bg-black/20 flex flex-col justify-center">
                  <p className="text-slate-300 text-xl leading-relaxed mb-12 font-medium text-center lg:text-left">{cards[currentCard].text}</p>
                  <button 
                    onClick={() => currentCard === cards.length - 1 ? setStage('intro') : setCurrentCard(c => c + 1)}
                    className="btn-primary w-full py-6 text-sm font-bold rounded-2xl group transition-all"
                  >
                    {currentCard === cards.length - 1 ? 'Iniciar Ahora' : 'Continuar'}
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* INTRO PHASE - Just lists areas */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-5xl glass-card rounded-[2.5rem] p-10 border border-white/5 mx-auto flex flex-col lg:flex-row gap-12"
            >
              <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                <div className="w-20 h-20 rounded-2xl bg-white/5 text-medical-400 flex items-center justify-center border border-white/10 mb-8 mx-auto lg:mx-0">
                  <Target size={40} className="animate-pulse-slow" />
                </div>
                <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight uppercase">Diagnóstico<br />de Nivel</h2>
                <p className="text-slate-400 text-lg font-medium max-w-md mx-auto lg:mx-0">Evaluaremos tu conocimiento en áreas clave para personalizar tu experiencia de aprendizaje.</p>
              </div>

              <div className="lg:w-1/2 space-y-4">
                {diagnostic.map((s, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-medical-400 font-bold text-lg border border-white/10 shadow-sm group-hover:scale-105 transition-transform">
                      {s.questions.length}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg tracking-tight uppercase">{s.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Módulo de Evaluación</p>
                    </div>
                    <Lock size={18} className="text-slate-700" />
                  </div>
                ))}
                
                <button onClick={() => setStage('diagnostic')} className="btn-primary w-full mt-6 py-6 text-sm font-bold rounded-2xl group shadow-2xl transition-all">
                  Comenzar Evaluación <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* DIAGNOSTIC */}
          {stage === 'diagnostic' && currentQuestionData && (
            <motion.div
              key="diagnostic"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-6xl flex flex-col h-full relative z-10 mx-auto"
            >
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Panel: Context */}
                <div className="lg:w-1/3 lg:sticky lg:top-4 h-fit space-y-8">
                  <div>
                    <span className="text-[10px] font-bold text-medical-500 uppercase tracking-widest mb-2 block">{currentSectionData.title}</span>
                    <h3 className="text-3xl font-display font-bold text-white tracking-tight uppercase leading-tight">Evaluación de<br />Nivel</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-row justify-between items-end">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Progreso Global</span>
                      <div className="bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/5">
                        <span className="text-white font-mono text-sm font-bold">{totalAnswered + 1} <span className="text-white/20">/</span> {totalQ}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-medical-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hidden lg:block">
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic opacity-70">
                      "Tus respuestas permiten a nuestra IA adaptar el contenido técnico y estratégico de los siguientes módulos."
                    </p>
                  </div>
                </div>

                {/* Right Panel: Content */}
                <div className="lg:w-2/3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={totalAnswered}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <h2 className="text-2xl lg:text-3xl font-display font-bold text-white leading-tight tracking-tight uppercase italic">
                        {currentQuestionData.text}
                      </h2>

                      <div className="grid gap-3">
                        {currentQuestionData.options.map((opt, idx) => {
                          const correctIdx = currentQuestionData.options.findIndex(o => o.points >= 4);
                          const isCorrect = idx === correctIdx;
                          const isSelected = idx === selectedIdx;
                          
                          let stateCls = "bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05] hover:border-white/10";
                          if (answered) {
                            if (isCorrect) stateCls = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]";
                            else if (isSelected) stateCls = "bg-rose-500/10 border-rose-500/50 text-rose-400";
                            else stateCls = "bg-white/[0.01] border-white/5 text-white/10 opacity-30";
                          } else if (isSelected) {
                            stateCls = "bg-white/[0.08] border-white/20 text-white translate-x-1";
                          }

                          return (
                            <button
                              key={idx}
                              disabled={answered}
                              onClick={() => handleAnswer(idx, opt.points)}
                              className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-5 group ${stateCls}`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm transition-all duration-300 ${
                                answered && isCorrect ? 'bg-emerald-500 text-white' : 
                                answered && isSelected && !isCorrect ? 'bg-rose-500 text-white' : 
                                isSelected ? 'bg-medical-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-slate-300'
                              }`}>
                                {answered && isCorrect ? <CheckCircle2 size={20} /> : String.fromCharCode(65 + idx)}
                              </div>
                              <span className="text-base font-medium leading-tight flex-1">{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULTS */}
          {stage === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-5xl relative z-10 mx-auto"
            >
              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-3xl flex flex-col lg:flex-row">
                {/* Left Column: Outcome */}
                <div className="lg:w-1/2 bg-gradient-to-br from-medical-600 to-blue-700 p-12 text-white relative overflow-hidden flex flex-col items-center justify-center text-center">
                  <div className="absolute inset-0 bg-white/5 blur-3xl opacity-30" />
                  
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="flex items-center justify-center mb-8"
                  >
                    <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-2xl">
                      {React.createElement(getResults(score, maxScore, isPro).icon, { size: 48, className: "animate-pulse-slow" })}
                    </div>
                  </motion.div>
                  <h2 className="text-4xl font-display font-bold mb-4 tracking-tight leading-none uppercase italic">{getResults(score, maxScore, isPro).title}</h2>
                  <p className="text-white/80 text-lg font-medium max-w-[340px] mx-auto leading-relaxed">
                    {getResults(score, maxScore, isPro).msg}
                  </p>
                </div>

                {/* Right Column: Breakdown */}
                <div className="lg:w-1/2 p-12 bg-black/40 backdrop-blur-xl space-y-10 flex flex-col justify-center">
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Desempeño Global</span>
                      <span className="text-4xl font-display font-bold text-medical-500">{Math.round((score / maxScore) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.round((score / maxScore) * 100)}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-medical-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 text-center transition-all hover:bg-white/[0.05]">
                      <div className="text-3xl font-bold text-white mb-1">+{getResults(score, maxScore, isPro).xpBonus}</div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">XP Bonus</div>
                    </div>
                    
                    <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 text-center transition-all hover:bg-white/[0.05]">
                      <div className="text-sm font-bold text-white mb-1 truncate px-2 italic uppercase">{getResults(score, maxScore, isPro).badge}</div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Insignia</div>
                    </div>
                  </div>

                  <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-medical-500/10 flex items-center justify-center text-medical-500 border border-medical-500/20">
                      <Info size={18} />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium leading-tight">
                      Tu ruta ha sido configurada. El contenido se ha adaptado a tu nivel {score / maxScore > 0.7 ? 'experto' : 'actual'}.
                    </p>
                  </div>

                  <button onClick={handleComplete} className="btn-primary w-full py-6 text-sm font-bold rounded-2xl group shadow-2xl transition-all hover:scale-[1.02]">
                    Comenzar el Programa <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModuleZero;
