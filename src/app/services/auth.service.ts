import { NavbarComponent } from './../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { jwtDecode } from 'jwt-decode';
import { RegisterModel } from '../models/register-model';
import { UserDetails } from '../models/user-details';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  route: string = environment.apiUrl + 'Account/Login';
  constructor(private http: HttpClient) {}

  login(dto: LoginModel): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.route, dto).pipe(
      map((res) => {
        if (res) {
          localStorage.setItem(environment.tokenKey, res.token);
        }
        return res;
      }),
    );
  }

  getToken = (): string | null => localStorage.getItem(environment.tokenKey);

  isLogedIn = () => (this.getToken() ? true : false);
  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const isTokenExpire = Date.now() >= decodedToken['exp']! * 1000;
    if (isTokenExpire) this.logout();
    return isTokenExpire;
  }

  logout() {
    localStorage.removeItem(environment.tokenKey);
  }

  getUserDetails() {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetails = {
      id: decodedToken.nameid,
      fullname: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };
    return userDetails;
  }

  register(dto: RegisterModel): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'Account/register', dto);
  }
  getDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(
      environment.apiUrl + 'Account/userDetails',
    );
  }
}
