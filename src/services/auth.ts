import { VALID_EMAIL, VALID_PASSWORD } from "../constants/auth";
import { AuthCredentials, AuthResponse } from "../types/User";

export const login = async (credentials: AuthCredentials): Promise<AuthResponse | null> => {
  // Validación de usuario hardcodeada para el challenge
  if (
    credentials.email === VALID_EMAIL &&
    credentials.password === VALID_PASSWORD
  ) {
    return {
      status: 'success',
      code: 200,
      data: {
          id: '1',
          email: credentials.email,
    }
    };
  }
  return {
    status: 'error',
    code: 404
  };
};
