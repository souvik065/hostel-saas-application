'use client'
import { base64 } from '@/services/helperService';
import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookie = new Cookies();
export function useGetCookie(cookieName: string): string | undefined {
  const cookieValue = cookie.get(cookieName);
  if (cookieValue) {
    return cookieValue;
  }
  return undefined;
}
export function useSetCookie(cookieName: string, cookieValue: string): void {
  const cookieOptions: CookieSetOptions = {
    path: '/',
  };
  const encodedValue = base64.encode(cookieValue);
  cookie.set(cookieName, encodedValue, cookieOptions);
}
