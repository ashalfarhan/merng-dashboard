export * from './enums';

export interface EmailLogin {
  email: string;
  password: string;
}

export interface UsernameLogin {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

export type LOCALE = "en-uk" | "id-id" | string;
