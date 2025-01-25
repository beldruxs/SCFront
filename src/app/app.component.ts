import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Safe Click';
  showHeaderFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    document.title = this.title;
    this.router.events.subscribe(() => {
      this.showHeaderFooter = !this.router.url.startsWith('/login/u/');
    });
  }
}
