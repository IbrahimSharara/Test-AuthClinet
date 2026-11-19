import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Role } from '../models/roles';
import { RoleCreateRequest } from '../models/role-create-request';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  apiUrl = environment.apiUrl + 'Roles';
  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  createRole(model: RoleCreateRequest) {
    return this.http.post(this.apiUrl, model);
  }
}
