
// ============================================================
// DR. MEDIX — COUNTRY ROUTING SYSTEM
// Agrega soporte multi-país a la plataforma
// Paso 1: integrar este archivo
// Paso 2: agregar campo country a UserProfile en types.ts
// Paso 3: agregar selector de país al onboarding (paso 2, después del nombre)
// Paso 4: reemplazar getSystemPromptForModule en services/chat.ts
//         por getSystemPromptForModuleAndCountry
// ============================================================

import { getSystemPromptColombia } from './constants_colombia';
import { getSystemPromptForModule } from './constants';

// ============================================================
// PAÍSES DISPONIBLES
// ============================================================

export type SupportedCountry = 'EC' | 'CO' | 'PE' | 'CL' | 'BO';

export interface CountryConfig {
  code: SupportedCountry;
  name: string;
  flag: string;
  available: boolean;
  comingSoon?: boolean;
  regulatoryBody: string;
  healthMinistry: string;
  ethicsCode: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'EC',
    name: 'Ecuador',
    flag: '🇪🇨',
    available: true,
    regulatoryBody: 'ARCSA',
    healthMinistry: 'MSP',
    ethicsCode: 'COÉTICA',
  },
  {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    available: true,
    regulatoryBody: 'INVIMA',
    healthMinistry: 'MSPS',
    ethicsCode: 'AFIDRO',
  },
  {
    code: 'PE',
    name: 'Perú',
    flag: '🇵🇪',
    available: false,
    comingSoon: true,
    regulatoryBody: 'DIGEMID',
    healthMinistry: 'MINSA',
    ethicsCode: 'ALAFARPE',
  },
  {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    available: false,
    comingSoon: true,
    regulatoryBody: 'ISP',
    healthMinistry: 'MINSAL',
    ethicsCode: 'CIF',
  },
  {
    code: 'BO',
    name: 'Bolivia',
    flag: '🇧🇴',
    available: false,
    comingSoon: true,
    regulatoryBody: 'AGEMED',
    healthMinistry: 'MSD',
    ethicsCode: 'CAIFE',
  },
];

// ============================================================
// MÓDULOS CON VERSIÓN LOCAL (país-específicos)
// Los módulos NO listados aquí son universales y se sirven
// con el prompt estándar sin importar el país del usuario
// ============================================================

const LOCALIZED_MODULES = [1, 7, 8, 10];

/**
 * Retorna el system prompt correcto según módulo y país.
 * Para módulos universales (M2–M6, M9, IE, L, B) devuelve el prompt estándar.
 * Para módulos localizados (M1, M7, M8, M10) devuelve la versión del país.
 */
export const getSystemPromptForModuleAndCountry = (
  moduleId: number,
  country: SupportedCountry = 'EC'
): string => {
  // Si el módulo no tiene versión localizada, devolver el universal
  if (!LOCALIZED_MODULES.includes(moduleId)) {
    return getSystemPromptForModule(moduleId);
  }

  // Módulos localizados — seleccionar versión según país
  switch (country) {
    case 'CO':
      return getSystemPromptColombia(moduleId) || getSystemPromptForModule(moduleId);
    case 'EC':
    default:
      return getSystemPromptForModule(moduleId);
    // Cuando se creen PE, CL, BO agregar aquí:
    // case 'PE': return getSystemPromptPeru(moduleId) || getSystemPromptForModule(moduleId);
    // case 'CL': return getSystemPromptChile(moduleId) || getSystemPromptForModule(moduleId);
    // case 'BO': return getSystemPromptBolivia(moduleId) || getSystemPromptForModule(moduleId);
  }
};

/**
 * Retorna la config de un país dado su código.
 */
export const getCountryConfig = (code: SupportedCountry): CountryConfig => {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
};

/**
 * Retorna los países actualmente disponibles (available: true).
 */
export const getAvailableCountries = (): CountryConfig[] => {
  return COUNTRIES.filter(c => c.available);
};
