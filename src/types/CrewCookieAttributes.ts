export interface CookieAttributes {
  expires?: Date | number | undefined;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  httpOnly?: boolean;
}
