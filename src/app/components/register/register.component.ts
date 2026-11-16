import { Component } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PortalModule } from '@angular/cdk/portal';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '../../../../node_modules/@angular/common/index';

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
export class RegisterComponent {
  form: FormGroup;
  confirmIcon: boolean = true;
  PasswordIcon: boolean = true;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      fullname: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,15}$')],
      ],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,15}$')],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,15}$')],
      ],
      roles: [''],
    });
  }
}
