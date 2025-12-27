import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Homework } from './homework/homework';

export const STUDENT_ROUTES: Routes = [
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
    path: 'homework',
    component: Homework
  }
];

