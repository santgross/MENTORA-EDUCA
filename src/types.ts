export type Role = 'user' | 'model';

export enum UserLevel {
  NOVATO = 'NOVATO',
  EXPERIMENTADO = 'EXPERIMENTADO'
}

export enum AppMode {
  TUTOR = 'TUTOR',
  EVALUADOR = 'EVALUADOR',
  SIMULADOR = 'SIMULADOR',
  MENTOR = 'MENTOR'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string; // Nombre y Apellido
  email: string;
  phone: string;
  level: UserLevel;
  motivation: string;
  xp: number;
  rank: string; // Aprendiz, Practicante, etc.
  streak: number;
  completedModules: number[];
  badges: string[];
  completedQuizzes: string[]; // IDs de quizzes completados para no repetir XP
  lastActivity: string; // Fecha ISO de última actividad
}

export interface ChatSession {
  messages: Message[];
  isLoading: boolean;
}

export type XPEventType =
  | 'correct_answer'       // +30 XP
  | 'partial_answer'       // +15 XP
  | 'wrong_answer'         // +5 XP (siempre algo por intentar)
  | 'simulation_complete'  // +80 XP
  | 'quiz_passed'          // +50 XP
  | 'module_complete'      // +150 XP
  | 'streak_bonus'         // +25 XP
  | 'badge_earned';        // +100 XP

export const XP_VALUES: Record<XPEventType, number> = {
  correct_answer: 30,
  partial_answer: 15,
  wrong_answer: 5,
  simulation_complete: 80,
  quiz_passed: 50,
  module_complete: 150,
  streak_bonus: 25,
  badge_earned: 100,
};
