export type UserId = string;

export interface User {
  id: UserId;            
  email: string;         
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  code: number;
  data?: User;
}