export interface User {
  email: string;
  role: string;
  token: string;
}

export interface LoginResponse {
  ok: boolean;
  data: User;
}
