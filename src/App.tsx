import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Onboarding from './components/Onboarding';
import ModuleZero from './components/ModuleZero';
import ModuleIntro from './components/ModuleIntro';
import ModuleEmotionalIntelligence from './components/ModuleEmotionalIntelligence';
import ModulePersonalBrand from './components/ModulePersonalBrand';
import ModuleResilience from './components/ModuleResilience';
import ModuleLongTermRelationships from './components/ModuleLongTermRelationships';
import ModuleCareerPlan from './components/ModuleCareerPlan';
import ModuleFieldProductivity from './components/ModuleFieldProductivity';
import ModuleWellbeing from './components/ModuleWellbeing';
import { UserProfile, Message } from './types';
import { INITIAL_USER_PROFILE, RANKS } from './constants';
import { motion, AnimatePresence } from 'motion/react';

interface ModuleConfig {
  title: string;
  subtitle: string;
  duration: string;
  xpReward: number;
  objectives: string[];
  prerequisite?: string;
}

const CORE_MODULES_CONFIG: Record<number, ModuleConfig> = {
  1: {
    title: "Ecosistema Farmacéutico EC",
    subtitle: "Fundamentos del sector en Ecuador",
    duration: "1 semana",
    xpReward: 200,
    objectives: ["Comprender el sistema de salud ecuatoriano", "Identificar actores clave del ecosistema", "Conocer la normativa ARCSA y MSP"]
  },
  7: {
    title: "Normativa ARCSA/MSP",
    subtitle: "Regulación y Control Sanitario",
    duration: "1 semana",
    xpReward: 300,
    objectives: ["Dominar la regulación farmacéutica", "Entender registros sanitarios", "Aplicar el Código de Ética COÉTICA"],
    prerequisite: "M1 completado"
  },
  8: {
    title: "Farmacovigilancia y Ética",
    subtitle: "Seguridad del paciente y cumplimiento",
    duration: "1 semana",
    xpReward: 300,
    objectives: ["Reportar eventos adversos correctamente", "Aplicar principios éticos en campo", "Conocer sanciones y responsabilidades"]
  },
  2: {
    title: "Anatomía y Fisiología",
    subtitle: "Bases biológicas para el visitador",
    duration: "1 semana",
    xpReward: 400,
    objectives: ["Comprender sistemas del cuerpo humano", "Relacionar fisiología con farmacología", "Hablar el lenguaje técnico del médico"]
  },
  3: {
    title: "Farmacología Estratégica",
    subtitle: "Ciencia aplicada a la prescripción",
    duration: "1 semana",
    xpReward: 500,
    objectives: ["Dominar mecanismos de acción", "Interpretar fichas técnicas", "Posicionar productos con evidencia"]
  },
  13: {
    title: "Inteligencia Emocional",
    subtitle: "Habilidades blandas para el éxito",
    duration: "1 semana",
    xpReward: 400,
    objectives: ["Desarrollar autoconciencia emocional", "Gestionar emociones bajo presión", "Construir rapport con médicos"]
  },
  4: {
    title: "Psicología de la Persuasión",
    subtitle: "Entendiendo el comportamiento médico",
    duration: "1 semana",
    xpReward: 500,
    objectives: ["Aplicar perfiles DISC", "Adaptar el mensaje al médico", "Técnicas de influencia ética"]
  },
  5: {
    title: "Ciclo de Venta Consultiva",
    subtitle: "Metodología ACAE de alto impacto",
    duration: "1 semana",
    xpReward: 600,
    objectives: ["Dominar el modelo ACAE", "Ejecutar visitas médicas efectivas", "Cerrar compromisos de prescripción"]
  },
  6: {
    title: "Manejo de Objeciones",
    subtitle: "Convirtiendo barreras en alianzas",
    duration: "1 semana",
    xpReward: 600,
    objectives: ["Anticipar objeciones del médico", "Responder con evidencia científica", "Convertir objeciones en oportunidades"]
  },
  9: {
    title: "Simulaciones Alta Fidelidad",
    subtitle: "Entrenamiento inmersivo con IA",
    duration: "2 semanas",
    xpReward: 800,
    objectives: ["Practicar visitas médicas reales", "Recibir feedback inmediato de IA", "Perfeccionar técnica bajo presión"]
  },
  10: {
    title: "Proyecto y Certificación",
    subtitle: "Validación de competencias profesionales",
    duration: "2 semanas",
    xpReward: 1000,
    objectives: ["Desarrollar proyecto integrador real", "Aprobar evaluación certificable", "Obtener certificado profesional"]
  }
};

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeModule, setActiveModule] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [moduleIntroStates, setModuleIntroStates] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('dr_medix_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      setIsOnboardingComplete(true);
      setShowLanding(false);
      
      let initialModule = 0;
      if (profile.completedModules.includes(0)) {
        initialModule = 1;
      }
      setActiveModule(initialModule);
      
      // Restaurar chat guardado para el módulo inicial
      const savedMessages = localStorage.getItem(`dr_medix_chat_module_${initialModule}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  // Persistir mensajes cuando cambian, limitando a los últimos 50
  useEffect(() => {
    if (isOnboardingComplete && messages.length > 0) {
      localStorage.setItem(`dr_medix_chat_module_${activeModule}`, JSON.stringify(messages.slice(-50)));
    }
  }, [messages, activeModule, isOnboardingComplete]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsOnboardingComplete(true);
    setShowLanding(false);
    localStorage.setItem('dr_medix_profile', JSON.stringify(profile));
  };

  const handleDemoAccess = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsOnboardingComplete(true);
    setShowLanding(false);
    localStorage.setItem('dr_medix_profile', JSON.stringify(profile));
    setActiveModule(1); // Entrar directo al M1
  };

  const handleLogout = () => {
    // Borrar todos los chats guardados al cerrar sesión
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('dr_medix_chat_module_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.removeItem('dr_medix_profile');
    setUserProfile(null);
    setIsOnboardingComplete(false);
    setMessages([]);
    setActiveModule(0);
  };

  const handleXPIncrease = (options: { amount: number; activityId?: string }) => {
    if (!userProfile) return;
    
    // Garantizar que existan los arrays necesarios
    const completedQuizzes = userProfile.completedQuizzes || [];
    
    // Si hay activityId, verificar si ya se completó para evitar duplicar XP
    if (options.activityId && completedQuizzes.includes(options.activityId)) {
      return;
    }

    const now = new Date();
    const nowISO = now.toISOString();

    // Cálculo de racha (streak) basado en lastActivity
    let newStreak = userProfile.streak || 1;
    if (userProfile.lastActivity) {
      const lastDate = new Date(userProfile.lastActivity);
      
      // Normalizar a fechas sin hora para comparar días
      const lastDay = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
      const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const diffTime = currentDay.getTime() - lastDay.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        // Participó el día siguiente: aumenta racha
        newStreak += 1;
      } else if (diffDays > 1) {
        // Pasó más de un día: racha vuelve a 1
        newStreak = 1;
      }
      // Si diffDays === 0, ya participó hoy, la racha se mantiene
    }

    const newXP = (userProfile.xp || 0) + options.amount;
    
    // Recalcular rango automáticamente según los límites definidos en constants.ts
    let newRank = userProfile.rank;
    const sortedRanks = [...RANKS].sort((a, b) => b.minXp - a.minXp);
    const matchingRank = sortedRanks.find((r) => newXP >= r.minXp);
    if (matchingRank) {
      newRank = matchingRank.title;
    }

    // Registrar quiz o actividad si aplica
    const newQuizzesList = options.activityId 
      ? [...completedQuizzes, options.activityId] 
      : completedQuizzes;

    const newProfile: UserProfile = { 
      ...userProfile, 
      xp: newXP, 
      rank: newRank,
      streak: newStreak,
      completedQuizzes: newQuizzesList,
      lastActivity: nowISO
    };

    setUserProfile(newProfile);
    localStorage.setItem('dr_medix_profile', JSON.stringify(newProfile));
  };

  const handleModuleZeroComplete = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('dr_medix_profile', JSON.stringify(updatedProfile));
    setActiveModule(1); // Move to first real module
  };

  const handleModuleChange = (id: number) => {
    // Guardar chat actual antes de cambiar de módulo
    if (messages.length > 0) {
      localStorage.setItem(`dr_medix_chat_module_${activeModule}`, JSON.stringify(messages.slice(-50)));
    }

    // Cargar chat del nuevo módulo
    const savedMessages = localStorage.getItem(`dr_medix_chat_module_${id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]);
    }

    setActiveModule(id);
    setIsSidebarOpen(false);
    if (id >= 1 && id <= 19) {
      setModuleIntroStates(prev => ({ ...prev, [id]: false }));
    }
  };

  if (showLanding && !isOnboardingComplete) {
    return <Landing onStart={() => setShowLanding(false)} onDemo={handleDemoAccess} />;
  }

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} onBack={() => setShowLanding(true)} />;
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#020408] overflow-hidden font-sans text-slate-200">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[500px] h-[500px] bg-medical-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-[5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" 
        />
        <div className="absolute inset-0 bg-[#020408]/20" />
      </div>

      <header className="h-16 border-b border-white/5 bg-[#020408]/90 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 z-40 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:hidden rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          {/* Brand — solo visible en mobile; en desktop el sidebar ya lo muestra */}
          <div className="flex items-center gap-2.5 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-medical-600 flex items-center justify-center text-white shadow-lg shadow-medical-600/20 border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white uppercase tracking-tight block leading-none">DR. MEDIX</span>
              <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.15em] block mt-0.5">6 Dimensiones</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none mb-1">Módulo Actual</span>
              <span className="text-xs font-semibold text-white">
                {activeModule === 0 ? "Evaluación Inicial" : `Módulo ${activeModule}`}
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end text-right">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none mb-1">Progreso</span>
              <span className="text-xs font-bold text-medical-400">{userProfile?.xp || 0} XP</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-medical-500/20 to-emerald-700/20 border border-medical-500/20 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              {userProfile?.name.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Overlay for mobile */}
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
        
        {/* Sidebar Navigation */}
        <div className={`fixed md:relative z-50 h-full transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <Sidebar 
            user={userProfile || INITIAL_USER_PROFILE} 
            activeModuleId={activeModule}
            onModuleChange={handleModuleChange}
            onLogout={handleLogout}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 relative h-full bg-[#05070A]">
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
              {activeModule === 0 && userProfile && !userProfile.completedModules.includes(0) ? (
                <motion.div
                  key="module-zero"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col"
                >
                  <ModuleZero user={userProfile} onComplete={handleModuleZeroComplete} />
                </motion.div>
              ) : CORE_MODULES_CONFIG[activeModule] && !moduleIntroStates[activeModule] ? (
                <motion.div
                  key={`module-${activeModule}-intro`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModuleIntro 
                    moduleId={activeModule}
                    moduleTitle={CORE_MODULES_CONFIG[activeModule].title}
                    moduleSubtitle={CORE_MODULES_CONFIG[activeModule].subtitle}
                    duration={CORE_MODULES_CONFIG[activeModule].duration}
                    xpReward={CORE_MODULES_CONFIG[activeModule].xpReward}
                    objectives={CORE_MODULES_CONFIG[activeModule].objectives}
                    prerequisite={CORE_MODULES_CONFIG[activeModule].prerequisite}
                    onStartChat={() => setModuleIntroStates(prev => ({ ...prev, [activeModule]: true }))}
                  />
                </motion.div>
              ) : activeModule === 13 && !moduleIntroStates[13] ? (
                <motion.div
                  key="module-13-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModuleEmotionalIntelligence onStartChat={() => setModuleIntroStates(prev => ({ ...prev, 13: true }))} />
                </motion.div>
              ) : activeModule === 14 && !moduleIntroStates[14] ? (
                <motion.div
                  key="module-14-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModulePersonalBrand onStartChat={() => setModuleIntroStates(prev => ({ ...prev, 14: true }))} />
                </motion.div>
              ) : activeModule === 15 && !moduleIntroStates[15] ? (
                <motion.div
                  key="module-15-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModuleResilience onStartChat={() => setModuleIntroStates(prev => ({ ...prev, 15: true }))} />
                </motion.div>
              ) : activeModule === 16 && !moduleIntroStates[16] ? (
                <motion.div
                  key="module-16-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModuleLongTermRelationships onStartChat={() => setModuleIntroStates(prev => ({ ...prev, 16: true }))} />
                </motion.div>
              ) : activeModule === 17 && !moduleIntroStates[17] ? (
                <motion.div
                  key="module-17-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModuleCareerPlan onStartChat={() => setModuleIntroStates(prev => ({ ...prev, 17: true }))} />
                </motion.div>
              ) : activeModule === 18 && !moduleIntroStates[18] ? (
                <motion.div
                  key="module-18-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModuleFieldProductivity onStartChat={() => setModuleIntroStates(prev => ({ ...prev, 18: true }))} />
                </motion.div>
              ) : activeModule === 19 && !moduleIntroStates[19] ? (
                <motion.div
                  key="module-19-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ModuleWellbeing onStartChat={() => setModuleIntroStates(prev => ({ ...prev, 19: true }))} />
                </motion.div>
              ) : (
                <motion.div
                  key={`module-${activeModule}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col h-full"
                >
                  <ChatInterface 
                    activeModuleId={activeModule}
                    messages={messages}
                    setMessages={setMessages}
                    onXPIncrease={(options) => handleXPIncrease(options)}
                    userProfile={userProfile || INITIAL_USER_PROFILE}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
