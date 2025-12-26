import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Register } from './register/register';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'dashboard',
    component: Register
  }
];
