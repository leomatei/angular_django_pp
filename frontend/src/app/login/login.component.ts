import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFields: { name: string; label: string; type: string; value: any }[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginFields = [
      { name: 'username', label: 'Username', type: 'text', value: '' },
      { name: 'password', label: 'Password', type: 'password', value: '' },
    ];
  }

  onFormSubmit(formData: any): void {
    const { username, password } = formData;
    this.authService.login(username, password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed');
      }
    );
  }
}
