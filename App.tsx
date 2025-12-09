import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ModuleZero from './components/ModuleZero';
import { UserProfile, Message } from './types';
import { RANKS } from './constants';
import { initializeChat, sendMessageToGemini } from './services/geminiService';
import { AppMode } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  // Persistence Logic: Load user from localStorage on mount
  useEffect(() => {
    const loadSession = () => {
      try {
        const savedUser = localStorage.getItem('dr_medix_user');
        const savedMessages = localStorage.getItem('dr_medix_messages');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        
        if (savedMessages) {
          // Hydrate Date objects from JSON strings
          const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Error loading session:", error);
        // Fallback: Clear potentially corrupted data
        localStorage.removeItem('dr_medix_user');
      } finally {
        setIsSessionLoading(false);
      }
    };

    loadSession();
  }, []);

  // Persistence Logic: Save user & messages to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('dr_medix_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('dr_medix_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Initial greeting logic - Triggered only if user exists but session hasn't started
  // AND Module 0 is completed (so we don't start chat while in Module 0)
  useEffect(() => {
    const startSession = async () => {
      const isModuleZeroComplete = user?.completedModules.includes(0);
      
      if (user && isModuleZeroComplete && !isInitializing) {
        
        setIsInitializing(true);
        try {
          // Pass 'messages' (history) to the initialization
          await initializeChat(user, messages);

          // Only trigger the auto-intro if there are NO messages yet (Fresh start of Module 1)
          if (messages.length === 0) {
            const introResponse = await sendMessageToGemini("Hola, acabo de iniciar el Módulo 1.", AppMode.TUTOR);
            const introMsg: Message = {
              id: 'init-1',
              role: 'model',
              text: introResponse,
              timestamp: new Date()
            };
            setMessages([introMsg]);
          }
        } catch (error) {
          console.error("Error initializing session:", error);
        } finally {
          setIsInitializing(false);
        }
      }
    };

    // We depend on 'user' and 'isSessionLoading' to ensure we don't init before loading storage
    if (!isSessionLoading) {
      startSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isSessionLoading]); 

  const handleOnboardingComplete = (newUser: UserProfile) => {
    // Save immediately upon completion
    localStorage.setItem('dr_medix_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleModuleZeroComplete = (updatedUser: UserProfile) => {
    // Save and update state to trigger Main Chat
    localStorage.setItem('dr_medix_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleLogout = () => {
    // Clear all persistence
    localStorage.removeItem('dr_medix_user');
    localStorage.removeItem('dr_medix_messages');
    setUser(null);
    setMessages([]);
    // Reload to ensure clean state
    window.location.reload(); 
  };

  const handleXPIncrease = () => {
    if (!user) return;
    
    // Add 15 XP per interaction
    const newXP = user.xp + 15;
    
    // Check for Rank Up
    const currentRank = RANKS.find(r => r.title === user.rank);
    const nextRank = RANKS[RANKS.indexOf(currentRank!) + 1];
    
    let newRank = user.rank;
    if (nextRank && newXP >= nextRank.minXp) {
      newRank = nextRank.title;
      // In a real app, trigger a celebration modal here
      console.log("Level Up!");
    }

    setUser({
      ...user,
      xp: newXP,
      rank: newRank
    });
  };

  if (isSessionLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
          <p className="text-slate-500 font-medium">Cargando MENTORA EDUCA...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Check if Module 0 is completed.
  const isModuleZeroComplete = user.completedModules.includes(0);

  if (!isModuleZeroComplete) {
    return <ModuleZero user={user} onComplete={handleModuleZeroComplete} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      <div className="hidden md:block h-full">
         <Sidebar user={user} onLogout={handleLogout} />
      </div>
      <div className="flex-1 h-full flex flex-col">
        <ChatInterface 
          messages={messages} 
          setMessages={setMessages} 
          onXPIncrease={handleXPIncrease}
        />
      </div>
    </div>
  );
};

export default App;