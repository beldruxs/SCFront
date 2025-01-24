import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { AuthResponse } from '../../models';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login(this.username, this.password)
      .subscribe({
        next: (response: AuthResponse) => {
          sessionStorage.setItem('authToken', response.accessToken);
          sessionStorage.setItem('tokenType', response.tokenType);
          sessionStorage.setItem('username', response.username.toString());
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          alert('Invalid credentials');
        }
      });
  }
}
