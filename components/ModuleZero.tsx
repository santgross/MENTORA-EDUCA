import React, { useState } from 'react';
import { UserProfile, UserLevel } from '../types';
import { Bot, ArrowRight, Brain, Heart, Stethoscope, Pill, BookOpen, CheckCircle2, ChevronRight, Sparkles, Trophy } from 'lucide-react';

interface ModuleZeroProps {
  user: UserProfile;
  onComplete: (updatedUser: UserProfile) => void;
}

const ModuleZero: React.FC<ModuleZeroProps> = ({ user, onComplete }) => {
  const [stage, setStage] = useState<'welcome' | 'cards' | 'intro-diag' | 'diagnostic' | 'results'>('welcome');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showFeedback, setShowFeedback] = useState(false); // Visual feedback for selection

  // DATA
  const cards = [
    {
      title: "¿Qué es Mentora Educa?",
      icon: BookOpen,
      text: "MENTORA EDUCA es tu primera experiencia profesional en la industria farmacéutica. Aquí aprenderemos de forma guiada, práctica y adaptada a ti. No necesitas experiencia previa: yo te acompañaré paso a paso."
    },
    {
      title: "¿Cómo vas a aprender?",
      icon: Brain,
      text: "Nuestra metodología combina: Microlecciones breves, Casos clínicos para principiantes, Simulaciones de visita médica, Evaluaciones formativas y un Mentor IA disponible 24/7."
    },
    {
      title: "¿Qué esperar del programa?",
      icon: Trophy,
      text: "Al finalizar podrás: Comprender el ecosistema farmacéutico, Explicar conceptos de farmacología, Conocer anatomía básica, Preparar tu discurso y Diseñar una visita médica efectiva."
    },
    {
      title: "Tu primer paso: Diagnóstico",
      icon: Stethoscope,
      text: "Antes de avanzar, haremos un diagnóstico inicial. Este test no califica: te conoce. Con tus respuestas ajustaré tu ruta NOVATO para que aprendas al ritmo ideal."
    }
  ];

  const diagnosticSections = [
    {
      title: "Ecosistema Farmacéutico",
      questions: [
        {
          text: "¿Qué función cumple un Visitador Médico?",
          options: [
            { text: "Vender medicamentos directamente al público", points: 0 },
            { text: "Educar y apoyar a médicos sobre productos farmacéuticos", points: 4 },
            { text: "Distribuir productos a farmacias", points: 1 }
          ]
        },
        {
          text: "¿Qué entidad regula los medicamentos en Ecuador?",
          options: [
            { text: "ARCSA", points: 4 },
            { text: "MSP", points: 2 },
            { text: "Policía Nacional", points: 0 }
          ]
        },
        {
          text: "Un VM trabaja principalmente con:",
          options: [
            { text: "Médicos", points: 4 },
            { text: "Pacientes", points: 1 },
            { text: "Empresas privadas sin relación médica", points: 0 }
          ]
        },
        {
          text: "¿Cuál es un objetivo clave de la visita médica?",
          options: [
            { text: "Generar confianza profesional", points: 4 },
            { text: "Ofrecer promociones", points: 0 },
            { text: "Vender cajas directamente", points: 0 }
          ]
        },
        {
          text: "¿Qué significa “ética” en el trabajo farmacéutico?",
          options: [
            { text: "Respetar normas, transparencia, veracidad", points: 4 },
            { text: "Cumplir la cuota de ventas a toda costa", points: 0 },
            { text: "Hacer lo que el médico pida", points: 1 }
          ]
        }
      ]
    },
    {
      title: "Farmacología Básica",
      questions: [
        {
          text: "“Farmacocinética” se refiere a:",
          options: [
            { text: "Cómo el cuerpo procesa un medicamento", points: 4 },
            { text: "Cómo el medicamento actúa en el cuerpo", points: 0 }
          ]
        },
        {
          text: "Un analgésico sirve para:",
          options: [
            { text: "Calmar dolor", points: 4 },
            { text: "Bajar colesterol", points: 0 }
          ]
        },
        {
          text: "Los antibióticos se usan contra:",
          options: [
            { text: "Bacterias", points: 4 },
            { text: "Virus", points: 0 }
          ]
        },
        {
          text: "La dosis es importante porque:",
          options: [
            { text: "Asegura eficacia y seguridad", points: 4 },
            { text: "Solo es un requisito del laboratorio", points: 0 }
          ]
        },
        {
          text: "¿Qué se debe evitar?",
          options: [
            { text: "Autoprescripción o recomendación sin médico", points: 4 },
            { text: "Leer el prospecto del medicamento", points: 0 }
          ]
        }
      ]
    },
    {
      title: "Anatomía / Patologías comunes",
      questions: [
        {
          text: "¿Cuál es el órgano principal de la digestión?",
          options: [
            { text: "Estómago", points: 4 },
            { text: "Riñón", points: 0 }
          ]
        },
        {
          text: "¿Qué sistema controla el movimiento muscular?",
          options: [
            { text: "Nervioso", points: 4 },
            { text: "Endocrino", points: 1 }
          ]
        },
        {
          text: "¿Qué es una inflamación?",
          options: [
            { text: "Respuesta del cuerpo ante daño o infección", points: 4 },
            { text: "Una bajada de presión", points: 0 }
          ]
        },
        {
          text: "La hipertensión afecta principalmente:",
          options: [
            { text: "Sistema cardiovascular", points: 4 },
            { text: "Sistema digestivo", points: 0 }
          ]
        },
        {
          text: "Un síntoma común de alergia:",
          options: [
            { text: "Picazón / estornudos", points: 4 },
            { text: "Fiebre alta", points: 0 }
          ]
        }
      ]
    },
    {
      title: "Comunicación",
      questions: [
        {
          text: "¿Qué es rapport?",
          options: [
            { text: "Conexión y confianza con el médico", points: 4 },
            { text: "Un reporte de ventas", points: 0 }
          ]
        },
        {
          text: "¿Cómo debe hablar un VM?",
          options: [
            { text: "Claro, científico, respetuoso", points: 4 },
            { text: "Informal y divertido", points: 0 }
          ]
        },
        {
          text: "Ante una objeción del médico debo:",
          options: [
            { text: "Escuchar y responder con evidencia", points: 4 },
            { text: "Evadir el tema", points: 0 }
          ]
        },
        {
          text: "Ante una pregunta que no sabes responder, ¿cuál es la acción correcta?",
          options: [
            { text: "Decir “no sé, pero lo averiguo y le cuento”", points: 4 },
            { text: "Inventar información para no quedar mal", points: 0 }
          ]
        },
        {
          text: "¿Qué genera más confianza?",
          options: [
            { text: "Presentar evidencia clínica real", points: 4 },
            { text: "Hacer promesas exageradas", points: 0 }
          ]
        }
      ]
    },
    {
      title: "Motivación y Estilo",
      questions: [
        {
          text: "¿Qué te motiva a ser VM?",
          options: [
            { text: "Crecimiento profesional", points: 0 },
            { text: "Estabilidad económica", points: 0 },
            { text: "Ayudar a pacientes", points: 0 }
          ]
        },
        {
          text: "¿Cómo aprendes mejor?",
          options: [
            { text: "Visual (videos, gráficos)", points: 0 },
            { text: "Auditivo (escuchar)", points: 0 },
            { text: "Práctico (hacer cosas)", points: 0 }
          ]
        },
        {
          text: "¿Qué tema te interesa más?",
          options: [
            { text: "Farmacología", points: 0 },
            { text: "Anatomía", points: 0 },
            { text: "Técnicas de venta", points: 0 },
            { text: "Todos por igual", points: 0 }
          ]
        }
      ]
    }
  ];

  const handleOptionSelect = (points: number) => {
    setScore(prev => prev + points);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      const currentSectObj = diagnosticSections[currentSection];
      if (currentQuestionIndex < currentSectObj.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        if (currentSection < diagnosticSections.length - 1) {
          setCurrentSection(prev => prev + 1);
          setCurrentQuestionIndex(0);
        } else {
          setStage('results');
        }
      }
    }, 400); // Short delay for visual feedback
  };

  const getProfile = () => {
    // Max score is 20 * 4 = 80 points from first 4 sections.
    // The prompt says total 100 points, but motivation section (5) has 0 points in my implementation above because the prompt said "No puntúa conocimiento".
    // We auto-award 20 points for completing motivation section to align with the 100 scale.
    
    const finalScore = score + 20; 
    
    if (finalScore <= 40) return {
      title: "Explorador",
      msg: "Vas a construir fundamentos sólidos conmigo. Estás empezando bien.",
      color: "text-blue-600 bg-blue-50 border-blue-200"
    };
    if (finalScore <= 70) return {
      title: "Aprendiz en Progreso",
      msg: "Ya tienes buena intuición. Vamos a potenciar tus habilidades.",
      color: "text-purple-600 bg-purple-50 border-purple-200"
    };
    return {
      title: "Listo para Despegar",
      msg: "Tu perfil muestra un talento natural. Esta ruta te hará avanzar aún más rápido.",
      color: "text-teal-600 bg-teal-50 border-teal-200"
    };
  };

  const finishModule = () => {
    const updatedUser = {
      ...user,
      completedModules: [...user.completedModules, 0],
      xp: user.xp + 100, // Award XP for Module 0
      badges: [...user.badges, "Iniciado"]
    };
    onComplete(updatedUser);
  };

  // RENDER HELPERS
  const renderMentorBubble = (text: string) => (
    <div className="flex items-start gap-4 mb-6 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center border-2 border-teal-200 flex-shrink-0">
        <Bot className="w-7 h-7 text-teal-600" />
      </div>
      <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-md relative text-slate-700">
        <p className="whitespace-pre-line">{text}</p>
        <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent border-b-[0px] border-b-transparent transform rotate-0" />
      </div>
    </div>
  );

  // --- VIEWS ---

  if (stage === 'welcome') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {renderMentorBubble(`¡Hola, ${user.name}! 👋\nSoy Dr. Medix, tu mentor IA en MENTORA EDUCA.\n\nHas dado el paso más importante: comenzar tu camino para convertirte en Visitador Médico profesional en Ecuador.\n\nEsta Ruta NOVATO está diseñada para ti que empiezas desde cero, pero tienes una decisión clara: entrar a la industria farmacéutica, aprender rápido y destacar desde el primer día.`)}
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-100 mb-8">
            <h3 className="font-bold text-slate-800 mb-3">En este módulo vas a:</h3>
            <ul className="space-y-2">
               <li className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-teal-500"/> Conocer cómo funciona la plataforma</li>
               <li className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-teal-500"/> Entender cómo aprenderemos juntos</li>
               <li className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-teal-500"/> Realizar un diagnóstico personalizado</li>
            </ul>
          </div>

          <button 
            onClick={() => setStage('cards')}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-500/20 transition flex items-center justify-center gap-2 text-lg"
          >
            Iniciar Módulo 0
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'cards') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, idx) => {
             const Icon = card.icon;
             return (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition duration-300">
                <div className="bg-teal-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                   <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.text}</p>
              </div>
             );
          })}
        </div>
        <div className="mt-8">
           <button 
            onClick={() => setStage('intro-diag')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            Realizar Diagnóstico
            <Stethoscope className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'intro-diag') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full">
           {renderMentorBubble("Este diagnóstico no mide cuán bueno eres, sino cómo puedo ayudarte mejor.\n\nRelájate, contesta con sinceridad y confía en tu instinto.")}
           <button 
            onClick={() => setStage('diagnostic')}
            className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            Comenzar Test
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'diagnostic') {
    const section = diagnosticSections[currentSection];
    const question = section.questions[currentQuestionIndex];
    const progress = ((currentSection * 5 + currentQuestionIndex) / 25) * 100; // Approx progress

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {/* Progress Bar */}
          <div className="mb-6 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-teal-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{section.title}</span>
            <span className="text-xs text-slate-400">{currentSection + 1}/{diagnosticSections.length}</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-4 min-h-[200px] flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center leading-tight">
              {question.text}
            </h3>

            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(opt.points)}
                  className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all flex justify-between items-center group"
                >
                  <span className="text-slate-700 group-hover:text-teal-800 font-medium text-sm">{opt.text}</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Mentor encouragement based on progress */}
          {(currentSection === 1 && currentQuestionIndex === 0) && renderMentorBubble("¡Excelente! Veo que tienes buena intuición.")}
          {(currentSection === 3 && currentQuestionIndex === 0) && renderMentorBubble("Vamos bien. No te preocupes si no sabes una respuesta.")}
        </div>
      </div>
    );
  }

  if (stage === 'results') {
    const profile = getProfile();
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-lg w-full animate-in zoom-in duration-500">
           {renderMentorBubble(`Muy bien, ${user.name}.\nCon tus respuestas he creado tu Identikit Farmacéutico Inicial.\n\nEsto me permitirá acompañarte exactamente en lo que necesitas.\nAhora sí: ¡tu Ruta NOVATO está oficialmente activada! 🎉`)}

           <div className={`bg-white p-8 rounded-2xl shadow-xl border-2 ${profile.color.split(' ')[2]} text-center mb-8`}>
              <div className="inline-block p-4 rounded-full bg-slate-50 mb-4 border border-slate-100">
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="text-slate-500 text-sm uppercase tracking-widest font-bold mb-1">Tu Perfil Inicial</h2>
              <h1 className="text-2xl font-bold text-slate-800 mb-4">{profile.title}</h1>
              <p className="text-slate-600 italic">"{profile.msg}"</p>
              
              <div className="mt-6 flex justify-center gap-4 text-sm text-slate-500">
                 <div className="flex flex-col items-center">
                   <span className="font-bold text-slate-800">{score + 20}</span>
                   <span>Puntos</span>
                 </div>
                 <div className="w-px bg-slate-200 h-10"></div>
                 <div className="flex flex-col items-center">
                   <span className="font-bold text-slate-800">Novato</span>
                   <span>Ruta</span>
                 </div>
              </div>
           </div>

           <button 
            onClick={finishModule}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            Ir a mi Panel de Control
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ModuleZero;
