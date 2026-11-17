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
    user.subscribe({
      next: (res) => {
        if (res && res?.roles.indexOf('Admin') >= 0) return true;
        else {
          matsnack.open(
            'You dont have permissions to enter this screen',
            'close',
            {
              duration: 3000,
            },
          );
          router.navigate(['']);
          return false;
        }
      },
    });
  }
  return false;
};
