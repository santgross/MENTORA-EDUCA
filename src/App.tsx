import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import Onboarding from './components/Onboarding';
import ModuleZero from './components/ModuleZero';
import ModuleEmotionalIntelligence from './components/ModuleEmotionalIntelligence';
import ModulePersonalBrand from './components/ModulePersonalBrand';
import ModuleResilience from './components/ModuleResilience';
import ModuleLongTermRelationships from './components/ModuleLongTermRelationships';
import ModuleCareerPlan from './components/ModuleCareerPlan';
import ModuleFieldProductivity from './components/ModuleFieldProductivity';
import ModuleWellbeing from './components/ModuleWellbeing';
import { UserProfile, Message } from './types';
import { INITIAL_USER_PROFILE } from './constants';
import { motion, AnimatePresence } from 'motion/react';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeModule, setActiveModule] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [moduleIntroStates, setModuleIntroStates] = useState<Record<number, boolean>>({
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
      // If module 0 is completed, set active module to 1 by default
      if (profile.completedModules.includes(0)) {
        setActiveModule(1);
      }
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsOnboardingComplete(true);
    localStorage.setItem('dr_medix_profile', JSON.stringify(profile));
  };

  const handleLogout = () => {
    localStorage.removeItem('dr_medix_profile');
    setUserProfile(null);
    setIsOnboardingComplete(false);
    setMessages([]);
    setActiveModule(0);
  };

  const handleXPIncrease = (amount: number = 10) => {
    if (!userProfile) return;
    const newXP = userProfile.xp + amount;
    const newProfile = { ...userProfile, xp: newXP };
    setUserProfile(newProfile);
    localStorage.setItem('dr_medix_profile', JSON.stringify(newProfile));
  };

  const handleModuleZeroComplete = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    localStorage.setItem('dr_medix_profile', JSON.stringify(updatedProfile));
    setActiveModule(1); // Move to first real module
  };

  const handleModuleChange = (id: number) => {
    setActiveModule(id);
    setIsSidebarOpen(false);
    if (id === 13 || id === 14 || id === 15 || id === 16 || id === 17 || id === 18 || id === 19) {
      setModuleIntroStates(prev => ({ ...prev, [id]: false }));
    }
  };

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
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

      <header className="h-16 border-b border-white/5 bg-[#020408]/80 backdrop-blur-xl flex items-center justify-between px-6 z-40 shrink-0">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:hidden rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-medical-500 flex items-center justify-center text-white shadow-lg shadow-medical-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>
            </div>
            <h1 className="font-display font-bold text-lg tracking-tight hidden sm:block uppercase">DR. MEDIX</h1>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Módulo Actual</span>
              <span className="text-xs font-semibold text-white">
                {activeModule === 0 ? "Evaluación Inicial" : `Módulo ${activeModule}`}
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Progreso</span>
              <span className="text-xs font-bold text-medical-500">{userProfile?.xp || 0} XP</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-inner">
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
                    onXPIncrease={() => handleXPIncrease(10)}
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
