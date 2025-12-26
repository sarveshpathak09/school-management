import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
   providedIn: 'root'
   })
export class Token {

  private tokenKey = 'authToken';
  private inMemoryToken?: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      this.inMemoryToken = token;
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return this.inMemoryToken ?? null;
  }

  removeToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    } else {
      this.inMemoryToken = undefined;
    }
  }
}

