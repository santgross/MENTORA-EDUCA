import { SupportedCountry } from './types';
import { getSystemPromptForModule } from './constants';

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  comingSoon?: boolean;
}

export const COUNTRIES: CountryInfo[] = [
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', comingSoon: true },
  { code: 'PE', name: 'Perú', flag: '🇵🇪', comingSoon: true },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', comingSoon: true },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', comingSoon: true },
];

export function getSystemPromptForModuleAndCountry(moduleId: number, country: SupportedCountry): string {
  const basePrompt = getSystemPromptForModule(moduleId);
  
  if (country === 'EC') return basePrompt;
  
  const countryNames: Record<SupportedCountry, string> = {
    'EC': 'Ecuador',
    'CO': 'Colombia',
    'PE': 'Perú',
    'CL': 'Chile',
    'BO': 'Bolivia'
  };

  return `
${basePrompt}

**ADAPTACIÓN GEOGRÁFICA:**
Estás guiando a un estudiante en ${countryNames[country]}. Aunque el programa base está diseñado con ejemplos de Ecuador, tu misión es adaptar los conceptos al mercado de ${countryNames[country]}.
- Si hablas de entes reguladores, menciona el equivalente si lo conoces (ej. INVIMA en CO, DIGEMID en PE, ISP en CL, AGEMED en BO).
- Adapta los nombres de instituciones de salud si es relevante.
- Mantén el rigor científico y ético del programa original.
  `;
}

export { type SupportedCountry };
