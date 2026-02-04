import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showLogin = true;
  invalidLogin = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.http.post<any>('http://localhost:5000/login', this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/about']);
        },
        error => {
          this.invalidLogin = true;
        }
      );
    }
  }

  onSubmitRegister() {
    if (this.registerForm.valid) {
      this.http.post<any>('http://localhost:5000/register', this.registerForm.value).subscribe(
        response => {
          this.showLogin = true;  // Toggle to show login form
          this.router.navigate(['/login']);  // Navigate to login page after successful registration
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
