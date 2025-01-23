import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  totalUsers: number = 100; // Example data
  activePhishingPages: number = 5; // Example data
  phishingPages: any[] = []; // Initialize as an empty array

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || 'Guest';
    this.apiService.getAllFakePages().subscribe({
      next: (response) => {
        this.phishingPages = response;
      },
      error: (error) => {
        console.error('Failed to fetch fake pages', error);
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/admin/login']);
  }

  goToPhishing() {
    this.router.navigate(['/phishing']);
  }

  viewDetails(nombre: string) {
    this.router.navigate([`/admin/detail/${nombre}`]);
  }

  viewPage(nombre: string) {
    this.router.navigate([`/login/${nombre}`]);
  }
}
