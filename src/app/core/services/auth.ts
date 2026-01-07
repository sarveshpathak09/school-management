import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Token } from './token';
import { of, throwError, tap } from 'rxjs';
import { environment } from '../../../environments/env';
import { Api } from './api';
import { AuthResponse, LoginRequest } from '../interface/auth';
import { Role } from '../interface/role';
import { isPlatformBrowser } from '@angular/common';
import { AUTH_API_URL } from './apiUrls';

 @Injectable({ 
   providedIn: 'root' 
 })

export class Auth {

  constructor(
    private api: Api,
    private tokenService: Token,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  //  DUMMY LOGIN API CALL
  dummyLogin(data: any) {
    // ✅ dummy credentials
     if (data.email === 'schoolsuperadmin@yopmail.com' && data.password === '12345678') {
      return of({
        token: 'static-token-123',
        role: 'SUPER_ADMIN'
      });
    }
    else if (data.email === 'schooladmin@yopmail.com' && data.password === '12345678') {
      return of({
        token: 'static-token-123',
        role: 'ADMIN'
      });
    }
    else if (data.email === 'schoolteacher@yopmail.com' && data.password === '12345678') {
      return of({
        token: 'static-token-123',
        role: 'SUB_ADMIN'
      });
    }
    else if (data.email === 'schoolstudent@yopmail.com' && data.password === '12345678') {
      return of({
        token: 'static-token-123',
        role: 'STUDENT'
      });
    }
    // ❌ wrong credentials
    return throwError(() => new Error('Invalid credentials'));
  }
  
  // Real API login (Node.js or .NET backends) using reusable Api service
  login(credentials: LoginRequest) {  // REAL BACKEND LOGIN API CALL
    return this.api.post<AuthResponse>(AUTH_API_URL.SIGN_IN, credentials)
    .pipe(
      tap(
        (res) => this.handleLogin(res)
      )
    );
  }
  
  
  handleLogin(res: AuthResponse) {
    this.tokenService.setToken(res.token);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('role', res.role);
    }
  }
  
  isLoggedIn(): boolean {  // Token exist in local storage have or not
    return !!this.tokenService.getToken();
  }

  getRole(): Role | null { // Get role from local storage
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role') as Role | null;
    }
    return null;
  }

  logout(): void {  // Token + role remove from local storage
    this.tokenService.removeToken();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('role');
      localStorage.removeItem('rememberedEmail');
    }
  }

  hasRole(role: Role): boolean { // Single role check (SUPER_ADMIN,ADMIN,, SUB_ADMIN, STUDENT)
    const current = this.getRole();
    return !!current && current === role;
  }

  hasAnyRole(roles: Role[]): boolean { // Multiple roles check (SUPER_ADMIN, ADMIN, SUB_ADMIN, STUDENT)
    const current = this.getRole();
    return !!current && roles.includes(current);
  }


  
}
