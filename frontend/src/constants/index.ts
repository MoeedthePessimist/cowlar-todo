export const colors: Record<string, string> = {
  personal: '#fc99ae',
  work: '#3fd4f4',
  urgent: '#fac608',
};

export const filters: {
  personal: string;
  work: string;
  urgent: string;
} = {
  personal: 'personal',
  work: 'work',
  urgent: 'urgent',
};

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
