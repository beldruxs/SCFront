import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() {}

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
}
