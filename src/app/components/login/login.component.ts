import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/login-model';
import {
  MatSnackBar,
  MatSnackBarLabel,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hidden = false;
  form!: FormGroup;
  model!: LoginModel;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: AuthService,
    private router: Router,
    private matsnka: MatSnackBar,
  ) {
    this.form = formBuilder.group({
      email: ['', (Validators.required, Validators.email)],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe({
        next: (res) => {
          this.matsnka.open(res.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          if (res) this.router.navigate(['/']);
        },
        error: (err) => {
          this.matsnka.open(err.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        },
      });
    }
  }
}
