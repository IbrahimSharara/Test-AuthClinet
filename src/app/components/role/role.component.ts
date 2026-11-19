import { Component, inject } from '@angular/core';
import { RoleFormComponent } from '../role-form/role-form.component';
import { RoleCreateRequest } from '../../models/role-create-request';
import { RolesService } from '../../services/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [RoleFormComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  role: RoleCreateRequest = {} as RoleCreateRequest;
  errorMessage!: string;
  matsnak = inject(MatSnackBar);
  rolesService = inject(RolesService);
  addRole(role: RoleCreateRequest) {
    this.rolesService.createRole(role).subscribe({
      next: (res) => {
        this.matsnak.open('Created Successfully !', 'Close', {
          duration: 300,
        });
      },
      error: (err) => {
        this.matsnak.open(err, 'close', {
          duration: 5000,
        });
      },
    });
  }
}
