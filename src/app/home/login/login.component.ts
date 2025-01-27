import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '../../models';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Click Aware | Iniciar Sesión');
  }

  login() {
    this.apiService.login(this.username, this.password)
      .subscribe({
        next: (response: AuthResponse) => {
          sessionStorage.setItem('authToken', response.accessToken);
          sessionStorage.setItem('tokenType', response.tokenType);
          sessionStorage.setItem('username', response.username.toString());
          this.router.navigate(['/net']);
        },
        error: (error) => {
          alert('Invalid credentials');
        }
      });
  }
}
