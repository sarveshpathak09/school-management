import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Token } from '../services/token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(Token);
  console.log("🚀 ~ authInterceptor ~ tokenService:", tokenService)

  const router = inject(Router);

  const token = tokenService.getToken();
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        // Handle unauthorized
        if (error.status === 401) {
          tokenService.removeToken();
          router.navigate(['/auth/login']);
        }
        // Log other errors (replace with toast/snackbar integration if available)
        // Keeping this minimal for now to be framework-agnostic
        // eslint-disable-next-line no-console
        console.error('HTTP Error', {
          status: error.status,
          url: error.url,
          message: error.message,
        });
      }
      return throwError(() => error);
    })
  );
};
