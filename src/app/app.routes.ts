import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { roleGuard } from './core/guards/role-guard';
import { guestGuard } from './core/guards/guest-guard';
// import { Sidebar } from './shared/common/sidebar/sidebar';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    component: AuthLayout,
    loadChildren: () =>import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'super-admin', // PRINCIPAL
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/super-admin/super-admin.routes').then(m => m.SUPER_ADMIN_ROUTES),
    data: { roles: ['SUPER_ADMIN'] }
  },
  {
    path: 'admin', // DIRECTOR or MANAGER
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'sub-admin', // TEACHER or ASSISTANT
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/sub-admin/sub-admin.routes').then(m => m.SUB_ADMIN_ROUTES),
    data: { roles: ['SUB_ADMIN'] }
  },
  {
    path: 'students', // STUDENT
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/students/student.routes').then(m => m.STUDENT_ROUTES),
    data: { roles: ['STUDENT'] }
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
