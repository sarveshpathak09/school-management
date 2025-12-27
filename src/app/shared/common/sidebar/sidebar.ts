import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Role } from '../../../core/interface/role';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  menuItems: { label: string; icon: string; link: string }[] = [];

  constructor(private auth: Auth) {
    const role = this.auth.getRole();
    this.menuItems = this.buildMenuForRole(role);
  }

  private buildMenuForRole(role: Role | null): { label: string; icon: string; link: string }[] {
    switch (role) {
      // PRINCIPAL
      case 'SUPER_ADMIN': {
        const base = '/super-admin';
        return [
          { label: 'Dashboard', icon: 'fas fa-chart-line', link: `${base}/dashboard` },
          { label: 'Managers',  icon: 'fas fa-user-tie', link: `${base}/managers` },
          { label: 'Settings',  icon: 'fas fa-cog', link: `${base}/settings` },
        ];
      }
      // DIRECTOR or MANAGER
      case 'ADMIN': {
        const base = '/admin';
        return [
          { label: 'Dashboard', icon: 'fas fa-chart-line', link: `${base}/dashboard` },
          { label: 'Students',  icon: 'fas fa-user-graduate', link: `${base}/students` },
          { label: 'Teachers',  icon: 'fas fa-chalkboard-teacher', link: `${base}/teachers` },
          { label: 'Classes',   icon: 'fas fa-layer-group', link: `${base}/classes` },
        ];
      }
      // TEACHER or ASSISTANT
      case 'SUB_ADMIN': {
        const base = '/sub-admin';
        return [
          { label: 'Dashboard',  icon: 'fas fa-chart-line', link: `${base}/dashboard` },
          { label: 'Attendance', icon: 'fas fa-clipboard-check', link: `${base}/attendance` },
          { label: 'Marks',      icon: 'fas fa-star', link: `${base}/marks` },
        ];
      }
      // STUDENT
      case 'STUDENT': {
        const base = '/students';
        return [
          { label: 'Dashboard', icon: 'fas fa-chart-line', link: `${base}/dashboard` },
          { label: 'Homework',  icon: 'fas fa-book-open', link: `${base}/homework` },
        ];
      }
      default:
        return [];
    }
  }
}
