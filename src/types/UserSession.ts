interface UserSession {
  userRole: string | null;
  token: string | null;
  user: object | null;
  userId: string | null;
  expires: any | null;
}
