import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
})
export class ForgotPassword {

  form: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      });
  }

  submit() {
    if (this.form.invalid) return;
    this.submitted = true;
    // In a real app, call API to send reset link
  }
}


