import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeNetGuard implements CanActivate {

  constructor(private authService: ApiService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    const token = this.authService.getToken();
    if (token && (this.authService.hasRole('USER') || this.authService.hasRole('ADMIN'))) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
