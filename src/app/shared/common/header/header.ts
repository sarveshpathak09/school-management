import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();
  constructor(private auth: Auth, private router: Router) {}

  onToggleClick() {
    this.toggleSidebar.emit();
  }

  onLogoutClick() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
