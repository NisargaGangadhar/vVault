import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe(
      (response: any) => {
        if (response.message === 'Login successful') {
          this.router.navigate(['/dashboard']); // Navigate to the next page
        } else {
          this.errorMessage = 'Invalid login credentials';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error(error);
      }
    );
  }
}
