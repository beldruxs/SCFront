import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Chart } from 'chart.js/auto';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  pageContent!: any;
  userContent!: any;
  id!: string;
  username: string = 'Guest';

  constructor(private titleService: Title, private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || 'Guest';
    this.titleService.setTitle('Click Aware | Admin Dashboard');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.apiService.getPageByNombre(this.id).subscribe({
        next: (response) => {
          this.pageContent = response;
          this.createCharts();
        },
        error: (error) => {
          console.error('Failed to fetch fake pages', error);
        }
      });

      this.apiService.getUsersByNombre(this.id).subscribe({
        next: (response) => {
          this.userContent = response;
        },
        error: (error) => {
          console.error('Failed to fetch fake pages', error);
        }
      });
    }
  }

  createCharts() {
    const visitsPicksChart = new Chart('visitsPicksChart', {
      type: 'pie',
      data: {
        labels: ['Visitas', 'Picks'],
        datasets: [{
          data: [this.pageContent.visitas, this.pageContent.picks],
          backgroundColor: ['#4CAF50', '#FF9800']
        }]
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/admin/login']);
  }

  goToPhishing() {
    this.router.navigate(['/admin/dashboard']);
  }

  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
