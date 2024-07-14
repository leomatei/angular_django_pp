import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupFields: { name: string; label: string; type: string; value: any }[] =
    [];
  passwordMismatchError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupFields = [
      { name: 'email', label: 'Email', type: 'text', value: '' },
      { name: 'username', label: 'Username', type: 'text', value: '' },
      { name: 'password', label: 'Password', type: 'password', value: '' },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        value: '',
      },
    ];
  }

  onFormSubmit(formData: any): void {
    const { email, username, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      this.passwordMismatchError = 'Passwords do not match';
      return;
    } else {
      this.passwordMismatchError = '';
    }
    console.log(email, username, password, confirmPassword);
  }
}
