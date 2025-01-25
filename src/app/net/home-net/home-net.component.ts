import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home-net',
  templateUrl: './home-net.component.html',
  styleUrls: ['./home-net.component.css']
})
export class HomeNetComponent implements OnInit {
  username: string | null = '';
  userProfile: any = {};

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.getUserProfile();
  }

  loadChart(): void {
    const ctx = document.getElementById('phishingChart') as HTMLCanvasElement;
    const total = this.userProfile.recibido;
    const enviado = this.userProfile.enviado;
    const entrado = this.userProfile.entrado;
    const enEspera = total - (enviado + entrado);

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Enviado', 'Entrado', 'En Espera'],
        datasets: [{
          label: 'Estadísticas de Phishing',
          data: [enviado, entrado, enEspera],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }

  getUserProfile(): void {
    if (this.username) {
      this.apiService.getUserProfileData(this.username).subscribe({
        next: (response: any) => {
          this.userProfile = response;
          this.loadChart();
        },
        error: (error) => {
          console.error('Failed to fetch user profile', error);
        }
      });
    }
  }

  navigateToEditProfile(): void {
    this.router.navigate(['net/edit-profile']);
  }
}
