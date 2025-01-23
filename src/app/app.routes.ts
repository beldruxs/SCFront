import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './admin-dashboard/login/login.component';
import { DashboardComponent } from './admin-dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import {LoginPagesComponent} from './login-pages/login-pages.component';
import {DetailComponent} from './admin-dashboard/detail/detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'detail/:id', component: DetailComponent }
    ]
  },
  {
    path: 'login/:id', component: LoginPagesComponent
  }
];
