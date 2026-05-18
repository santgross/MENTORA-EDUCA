import { SupportedCountry } from './types';

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

export { type SupportedCountry };
