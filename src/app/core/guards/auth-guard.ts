import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Skip auth checks on the server; enforce in the browser after hydration
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/auth/login'], { queryParams: { redirect: state.url } });
};
