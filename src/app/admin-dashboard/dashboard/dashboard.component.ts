import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('phishingDialog') phishingDialog!: TemplateRef<any>;
  phishingData = { username: '', mail: '', platform: 'linkedin' };

  username: string = '';
  totalUsers: number = 100; // Example data
  activePhishingPages: number = 5; // Example data
  phishingPages: any[] = []; // Initialize as an empty array

  constructor(private dialog: MatDialog, private http: HttpClient, private router: Router, private apiService: ApiService) {}

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
    this.router.navigate([`/login/u/${nombre}`]);
  }

  openPhishingDialog() {
    this.dialog.open(this.phishingDialog);
  }
  sendPhishing() {
    this.apiService.sendPhishing(this.phishingData).subscribe({
      next: (response) => {
        console.log('Phishing enviado exitosamente', response);
        this.dialog.closeAll();
      },
      error: (error) => {
        console.error('Error al enviar phishing', error);
      }
    });
  }
}
