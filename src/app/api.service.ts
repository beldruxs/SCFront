import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config';
import { AuthResponse, RegisterRequest } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<AuthResponse> {
    const loginDto = { username, password };
    return this.http.post<AuthResponse>(`${API_URL}/api/auth/login`, loginDto);
  }

  incrementFakePageVisits(fakePageName: string): Observable<string> {
    const params = new HttpParams().set('fakePageName', fakePageName);
    return this.http.post<string>(`${API_URL}/api/fakepage/incrementVisits`, null, { params });
  }

  createFakeUser(username: string, password: string, fakePageName: string): Observable<string> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('fakePageName', fakePageName);
    return this.http.post<string>(`${API_URL}/api/fakeuser/create`, null, { params });
  }

  getAllFakePages(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/api/fakepage/all`);
  }

  getPageByNombre(nombre: string): Observable<any> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<any>(`${API_URL}/api/fakepage/getByNombre`, { params });
  }

  getUsersByNombre(nombre: string): Observable<any[]> {
    const params = new HttpParams().set('fakePageName', nombre);
    return this.http.get<any[]>(`${API_URL}/api/fakeuser/getByPageName`, { params });
  }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post(`${API_URL}/api/auth/register`, registerRequest, { responseType: 'text' });
  }
}
