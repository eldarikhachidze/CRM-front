

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: Token;
  error?: any;
  status: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}
