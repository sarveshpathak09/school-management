import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Managers } from './managers/managers';
import { Settings } from './settings/settings';

export const SUPER_ADMIN_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'managers',
    component: Managers
  },
  {
    path: 'settings',
    component: Settings
  }
];

