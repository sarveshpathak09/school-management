import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Attendance } from './attendance/attendance';
import { Marks } from './marks/marks';

export const SUB_ADMIN_ROUTES: Routes = [
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
    path: 'attendance',
    component: Attendance
  },
  {
    path: 'marks',
    component: Marks
  }
];

