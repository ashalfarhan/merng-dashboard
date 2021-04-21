import jwtDecode from "jwt-decode";
export interface Token {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
export const isValid = (token: string) => {
  if (!token) {
    return false;
  }
  try {
    const { exp } = jwtDecode<Token>(token);
    if (Date.now() < exp * 1000) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
