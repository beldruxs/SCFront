import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { AuthResponse } from '../../models';

@Component({
  selector: 'app-login-admin',
  imports: [
    FormsModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    console.log("hola")
  }

  login() {
    this.apiService.loginAdmin(this.username, this.password)
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
