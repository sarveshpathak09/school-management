import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { roleGuard } from './core/guards/role-guard';
import { Sidebar } from './shared/common/sidebar/sidebar';

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
    path: 'super-admin',
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/super-admin/super-admin.routes').then(m => m.SUPER_ADMIN_ROUTES),
    data: { roles: ['SUPER_ADMIN'] }
  },
  {
    path: 'sub-admin',
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/sub-admin/sub-admin.routes').then(m => m.SUB_ADMIN_ROUTES),
    data: { roles: ['SUB_ADMIN'] }
  },
  {
    path: 'students',
    canActivate: [roleGuard],
    component: MainLayout,
    loadChildren: () => import('./features/students/student.routes').then(m => m.STUDENT_ROUTES),
    data: { roles: ['STUDENT'] }
  },
  {
    path: 'sidebar',
    canActivate: [roleGuard],
    component: Sidebar,
    data: { roles: ['ADMIN', 'SUPER_ADMIN', 'SUB_ADMIN'] }
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
