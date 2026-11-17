import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem(environment.tokenKey)) return true;
  let router = inject(Router);
  let matBar = inject(MatSnackBar);
  router.navigate(['/login']);
  matBar.open('Please login First', 'close', {
    duration: 3000,
  });
  return false;
};
