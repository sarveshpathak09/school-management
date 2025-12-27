import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {

  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      console.log("rememberedEmail>>", rememberedEmail)
      if (rememberedEmail) {
        this.loginForm.patchValue({
          email: rememberedEmail,
          rememberMe: true
        });
      }
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.authService.handleLogin(res);
        if (isPlatformBrowser(this.platformId)) {
          const rememberMe = this.loginForm.get('rememberMe')?.value;
          const emailVal = this.loginForm.get('email')?.value;
          if (rememberMe && emailVal) {
            localStorage.setItem('rememberedEmail', emailVal);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
        }
        console.log("🚀 ~ Login ~ onSubmit ~ res:", res)
        this.redirectPostLogin(res.role);
      },
      error: () => {
        this.error = 'Invalid credentials';
        this.loading = false;
      }
    });
  }

  redirectPostLogin(role: string) {
    const roleBase =
      role === 'SUPER_ADMIN' ? '/super-admin' :
      role === 'ADMIN' ? '/admin' :
      role === 'SUB_ADMIN' ? '/sub-admin' :
      role === 'STUDENT' ? '/students' : '/auth/login';

    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    if (redirect && redirect.startsWith(roleBase)) {
      this.router.navigateByUrl(redirect);
      return;
    }
    this.router.navigate([roleBase]);
  }
}
