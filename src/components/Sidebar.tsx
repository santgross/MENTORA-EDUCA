import React from 'react';
import { UserProfile } from '../types';
import { RANKS, MODULES, getUnlockedModuleIds } from '../constants';
import { BookOpen, LogOut, Star, CheckCircle2, Lock, PlayCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  user: UserProfile;
  activeModuleId: number;
  onLogout: () => void;
  onModuleChange: (moduleId: number) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeModuleId, onLogout, onModuleChange, onClose }) => {
  const currentRankIdx = RANKS.findIndex(r => r.title === user.rank);
  const currentRank    = RANKS[currentRankIdx] || RANKS[0];
  const nextRank       = RANKS[currentRankIdx + 1];

  const progressPercent = nextRank
    ? Math.min(((user.xp - currentRank.minXp) / (nextRank.minXp - currentRank.minXp)) * 100, 100)
    : 100;

  const unlockedModuleIds = getUnlockedModuleIds(user.xp, user.completedModules);

  return (
    <div className="w-72 lg:w-80 h-full glass-dark text-slate-400 flex flex-col z-20">
      
      {/* ── User Header ── */}
      <div className="p-6 border-b border-white/5 relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-medical-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl shadow-lg border border-white/10">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-display font-bold text-sm tracking-tight truncate leading-tight">{user.name}</h2>
            <p className="text-medical-500 text-[9px] font-black uppercase tracking-[0.15em]">{user.rank}</p>
          </div>
        </div>

        {/* XP Bar Slim */}
        <div className="space-y-2">
          <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
            <span>{user.xp.toLocaleString()} XP</span>
            <span>{nextRank ? `${nextRank.minXp.toLocaleString()} XP` : 'Max'}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-medical-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* ── Module List ── */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        <div className="px-3 mb-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 opacity-60">Plan de Estudios</span>
        </div>

        {MODULES.map((module) => {
          const isCompleted = user.completedModules.includes(module.id);
          const isUnlocked  = unlockedModuleIds.includes(module.id);
          const isActive    = module.id === activeModuleId;
          const isBonus     = module.id === 11 || module.id === 12;
          const isSpecial   = module.id === 13 || module.id === 14 || module.id === 15 || module.id === 16 || module.id === 17 || module.id === 18 || module.id === 19;

          const IconComp = isSpecial ? Sparkles
            : isBonus ? Star
            : isCompleted ? CheckCircle2
            : isActive    ? PlayCircle
            : isUnlocked  ? BookOpen
            : Lock;

          return (
            <button
              key={module.id}
              disabled={!isUnlocked}
              onClick={() => onModuleChange(module.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative ${
                isActive 
                  ? 'bg-white/5 text-white active-nav-item' 
                  : isUnlocked 
                    ? 'hover:bg-white/[0.03] text-slate-400 hover:text-slate-200' 
                    : 'opacity-30 cursor-not-allowed text-slate-600'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-dot"
                  className="absolute left-0 w-1 h-4 bg-medical-500 rounded-r-full"
                />
              )}
              
              <div className={`shrink-0 transition-colors ${isActive ? 'text-medical-500' : isCompleted ? 'text-emerald-500/60' : 'text-slate-600 group-hover:text-slate-400'}`}>
                <IconComp size={16} />
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className={`text-xs font-medium truncate ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {module.title}
                </div>
              </div>

              {!isUnlocked && <Lock size={10} className="text-slate-700" />}
            </button>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 flex flex-col items-center hover:bg-white/[0.04] transition-colors group/stat">
            <span className="text-white font-bold text-sm leading-none group-hover:scale-110 transition-transform">{user.badges.length}</span>
            <span className="text-[8px] text-slate-600 uppercase font-black mt-1 tracking-[0.15em]">Badges</span>
          </div>
          <div className="bg-white/[0.02] p-3 rounded-xl border border-white/5 flex flex-col items-center hover:bg-white/[0.04] transition-colors group/stat">
            <span className="text-white font-bold text-sm leading-none group-hover:scale-110 transition-transform">{user.completedModules.length}</span>
            <span className="text-[8px] text-slate-600 uppercase font-black mt-1 tracking-[0.15em]">Módulos</span>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest"
        >
          <LogOut size={14} /> Salir
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
