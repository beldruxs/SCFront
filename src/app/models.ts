export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  username: number;
}

export interface RegisterRequest {
  nombre: string;
  apellido1: string;
  apellido2?: string;
  username: string;
  password: string;
  mail: string;
  telefono: string;
  frecuencia: string;
}
