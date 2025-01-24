import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home-net',
  templateUrl: './home-net.component.html',
  styleUrls: ['./home-net.component.css']
})
export class HomeNetComponent implements OnInit {
  username: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.loadChart();
  }

  loadChart(): void {
    const ctx = document.getElementById('phishingChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Phishing Recibido', 'Phishing Entrado', 'Phishing Introducido los Datos'],
        datasets: [{
          label: 'Estadísticas de Phishing',
          data: [10, 5, 2], // Fake data
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
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  navigateToEditProfile(): void {
    this.router.navigate(['net/edit-profile']);
  }
}
