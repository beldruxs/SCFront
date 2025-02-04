import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthResponse } from '../../models';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {SpinnerComponent} from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    SpinnerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Click Aware | Iniciar Sesión');
  }

  login() {
    this.isLoading = true;
    this.apiService.login(this.username, this.password)
      .subscribe({
        next: (response: AuthResponse) => {
          sessionStorage.setItem('authToken', response.accessToken);
          sessionStorage.setItem('tokenType', response.tokenType);
          sessionStorage.setItem('username', response.username.toString());
          this.router.navigate(['/net']);
          this.isLoading = false;
        },
        error: (error) => {
          alert('Invalid credentials');
          this.isLoading = false;
        }
      });
  }
}
