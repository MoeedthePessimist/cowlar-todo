import { ENV_BACKEND_URL, ENV_WORKING_ENVIRONMENT } from '~/config';

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

export const BACKEND_URL = ENV_WORKING_ENVIRONMENT === 'development' ? ENV_BACKEND_URL : '';
