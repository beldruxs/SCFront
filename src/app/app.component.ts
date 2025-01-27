import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {NgIf} from '@angular/common';
import {Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Click Aware';
  showHeaderFooter = true;

  constructor(private router: Router, private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'description', content: 'Click Aware - diseñado para educar y concienciar a los usuarios sobre los riesgos y las técnicas de phishing.' },
      { name: 'keywords', content: 'phishing, precaución, hackeo, ciberseguridad, cyberseguridad, cybersecurity, Click Aware' },
      { name: 'author', content: 'Click Aware' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'robots', content: 'index, follow' },
      { name: 'canonical', content: 'https://clickaware.es/' }
    ]);

    this.router.events.subscribe(() => {
      this.showHeaderFooter = !this.router.url.startsWith('/login/u/');
    });
  }
}
