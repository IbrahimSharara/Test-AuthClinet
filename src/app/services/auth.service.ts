import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

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
}
