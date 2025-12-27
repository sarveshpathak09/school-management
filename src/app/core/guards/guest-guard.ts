import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Auth } from '../services/auth';

export const guestGuard: CanActivateFn = (route, state) => {
	const auth = inject(Auth);
	const router = inject(Router);
	const platformId = inject(PLATFORM_ID);

	// Skip checks on the server
	if (!isPlatformBrowser(platformId)) {
		return true;
	}

	// If already logged in, redirect to their dashboard
	if (auth.isLoggedIn()) {
		const role = auth.getRole();
		if (role === 'SUPER_ADMIN') {
			return router.createUrlTree(['/super-admin']);
		}
		if (role === 'ADMIN') {
			return router.createUrlTree(['/admin']);
		}
		if (role === 'SUB_ADMIN') {
			return router.createUrlTree(['/sub-admin']);
		}
		if (role === 'STUDENT') {
			return router.createUrlTree(['/students']);
		}
	}

	return true;
};


