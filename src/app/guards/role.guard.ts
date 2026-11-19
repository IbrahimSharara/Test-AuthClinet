import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let matsnack = inject(MatSnackBar);
  let router = inject(Router);
  const user = auth.getUserDetails();
  if (user) {
    if (user.roles.indexOf('Admin') >= 0) return true;
  }
  matsnack.open('You dont have permissions to enter this screen', 'close', {
    duration: 3000,
  });
  router.navigate(['']);
  return false;
};
