import { Session } from 'next-auth';

type User = {
  name: string;

  email: string;

  image: string;
};

declare module 'next-auth' {
  interface Session {
    user: User;
    userRole: string | null;
    token: string | null;
  }
}
