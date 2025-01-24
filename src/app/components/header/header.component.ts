import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton?.addEventListener('click', () => {
      if (mobileMenu!.style.display === 'none' || !mobileMenu!.style.display) {
        mobileMenu!.style.display = 'block';
      } else {
        mobileMenu!.style.display = 'none';
      }
    });
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
