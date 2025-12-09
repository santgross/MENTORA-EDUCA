import React from 'react';
import { UserProfile } from '../types';
import { RANKS, MODULES } from '../constants';
import { Trophy, Map, BookOpen, LogOut, Star, CheckCircle2, Lock, PlayCircle } from 'lucide-react';

interface SidebarProps {
  user: UserProfile;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const currentRank = RANKS.find(r => r.title === user.rank) || RANKS[0];
  const nextRank = RANKS[RANKS.indexOf(currentRank) + 1];
  
  const progressPercent = nextRank 
    ? ((user.xp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100
    : 100;

  return (
    <div className="w-80 bg-slate-900 text-slate-100 flex flex-col h-full border-r border-slate-800 shadow-2xl">
      {/* User Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-teal-500/20 text-white border-2 border-slate-800">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight truncate w-40">{user.name}</h2>
            <div className="text-xs text-teal-400 font-medium bg-teal-900/30 px-2 py-0.5 rounded-full inline-block mt-1 border border-teal-900/50">
              {user.rank}
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            <span>{user.xp} XP</span>
            <span>{nextRank ? nextRank.minXp : 'MAX'} XP</span>
          </div>
          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div 
              className={`h-full ${currentRank.color} transition-all duration-700 ease-out shadow-[0_0_10px_rgba(45,212,191,0.3)]`}
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
          {nextRank && (
            <div className="text-[10px] text-center text-slate-500">
              Siguiente: <span className="text-slate-300 font-bold">{nextRank.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation / Modules */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Programa ({user.level})
          </div>
        </div>
        
        <div className="space-y-1.5">
          {MODULES.map((module) => {
            const isCompleted = user.completedModules.includes(module.id);
            // Unlock if previous module is completed or if it's the first module (id 0)
            const isUnlocked = module.id === 0 || user.completedModules.includes(module.id - 1);
            const isActive = isUnlocked && !isCompleted;

            return (
              <div 
                key={module.id} 
                className={`p-2.5 rounded-lg flex items-start gap-3 transition-all duration-200 group ${
                  isActive
                    ? 'bg-slate-800 border-l-4 border-l-teal-500 shadow-md'
                    : isUnlocked 
                      ? 'bg-slate-800/40 hover:bg-slate-800 cursor-pointer border border-transparent' 
                      : 'opacity-40 cursor-not-allowed border border-transparent bg-slate-900'
                }`}
              >
                <div className={`mt-0.5 p-1.5 rounded-md transition-colors ${
                  isCompleted 
                    ? 'bg-green-500/10 text-green-400'
                    : isActive 
                      ? 'bg-teal-500/20 text-teal-400' 
                      : 'bg-slate-800 text-slate-500'
                }`}>
                   {module.title.includes("Bonus") ? <Star className="w-3.5 h-3.5" /> : 
                    isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                    isActive ? <PlayCircle className="w-3.5 h-3.5" /> :
                    isUnlocked ? <Map className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold truncate transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {module.title}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                    {isCompleted ? (
                      <span className="text-green-500 font-medium">Completado</span>
                    ) : isActive ? (
                      <span className="text-teal-400 font-medium animate-pulse">En Curso</span>
                    ) : isUnlocked ? (
                      'Disponible'
                    ) : (
                      'Bloqueado'
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer stats */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col items-center hover:bg-slate-800 transition-colors">
             <Trophy className="w-5 h-5 text-yellow-500 mb-1" />
             <span className="text-xs font-bold text-slate-300">{user.badges.length} Badges</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex flex-col items-center hover:bg-slate-800 transition-colors">
             <BookOpen className="w-5 h-5 text-teal-500 mb-1" />
             <span className="text-xs font-bold text-slate-300">Módulo {user.completedModules.length}</span>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:text-white py-2.5 hover:bg-red-950/30 rounded-lg transition-colors border border-transparent hover:border-red-900/30"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;