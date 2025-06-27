import { base64 } from './helperService';

const authService = {
  user(data: string): UserSession | null {
    const _userData = base64.decode(data);
    if (!_userData) return null;
    return JSON.parse(_userData) as UserSession;
  },
};

export { authService };
