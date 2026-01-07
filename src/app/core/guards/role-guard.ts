import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Auth } from '../services/auth';
import { Role } from '../interface/role';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Skip auth checks on the server; enforce in the browser after hydration
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/auth/login']);
  }

  const allowedRoles = (route.data?.['roles'] as Role[] | undefined) ?? undefined;
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }
  const userRole = auth.getRole();
  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  // If logged in but role not allowed, send to their dashboard
  if (userRole === 'SUPER_ADMIN') {
    return router.createUrlTree(['/super-admin']);
  }
  if (userRole === 'ADMIN') {
    return router.createUrlTree(['/admin']);
  }
  if (userRole === 'SUB_ADMIN') {
    return router.createUrlTree(['/sub-admin']);
  }
  if (userRole === 'STUDENT') {
    return router.createUrlTree(['/students']);
  }
  return router.createUrlTree(['/auth/login']);
};
