import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

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

  constructor(private titleService: Title, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.titleService.setTitle('Click Aware | Terms of Service');

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
        if (response.message === 'Phishing email sent successfully!') {
          this.dialog.closeAll();
          this.snackBar.open('Phishing enviado exitosamente', 'Cerrar', {
            duration: 3000,
          });
        } else {
          console.error('Error al enviar phishing', response);
          this.snackBar.open('Error al enviar phishing', 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error: (error) => {
        this.dialog.closeAll();
      }
    });
  }
}
