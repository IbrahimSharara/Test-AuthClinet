import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let currentReq = req;
  let token = localStorage.getItem(environment.tokenKey);
  if (token) {
    currentReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }
  return next(currentReq);
};
