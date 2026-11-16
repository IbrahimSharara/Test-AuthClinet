import { Component, OnInit } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PortalModule } from '@angular/cdk/portal';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '../../../../node_modules/@angular/common/index';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../models/roles';
import { AuthService } from '../../services/auth.service';
import { RegisterModel } from '../../models/register-model';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInputModule,
    MatIcon,
    MatPrefix,
    PortalModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  confirmIcon: boolean = true;
  PasswordIcon: boolean = true;
  roles!: Role[];
  constructor(
    private fb: FormBuilder,
    private matskn: MatSnackBar,
    private rolesService: RolesService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        fullname: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,15}$')],
        ],
        email: ['', [Validators.email, Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_\-]).{8,15}$',
            ),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_\-]).{8,15}$',
            ),
          ],
        ],
        roles: [''],
      },
      { validators: this.validatePasswordAndConfirmPassword },
    );
  }
  ngOnInit(): void {
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (er) => console.log(er),
    });
  }

  validatePasswordAndConfirmPassword(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  submitForm() {
    this.auth.register(this.form.value).subscribe({
      next: (result) => {
        if (result.isSuccess) {
          this.router.navigate(['/login']);
          this.matskn.open(result.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      error: (er) => console.log(er),
    });
  }
}
