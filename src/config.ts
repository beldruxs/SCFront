import { environment } from './environment/environment';

export const BASE_URL = environment.BASE_URL;
export const API_PORT = environment.API_PORT;
export const PROTOCOLO = environment.PROTOCOLO;

export const API_URL = `${PROTOCOLO}://${BASE_URL}${API_PORT}`;
