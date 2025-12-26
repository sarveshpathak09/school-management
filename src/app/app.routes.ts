import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admin',
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    data: { roles: ['ADMIN'] }
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
