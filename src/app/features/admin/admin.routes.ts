import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Students } from './students/students';
import { Teachers } from './teachers/teachers';
import { Classes } from './classes/classes';

export const ADMIN_ROUTES: Routes = [
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
    path: 'students',
    component: Students
  },
  {
    path: 'teachers',
    component: Teachers
  },
  {
    path: 'classes',
    component: Classes
  }
];
