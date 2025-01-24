import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin-dashboard/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import {LoginPagesComponent} from './login-pages/login-pages.component';
import {DetailComponent} from './admin-dashboard/detail/detail.component';
import {ContactComponent} from './home/contact/contact.component';
import { FeaturesComponent } from './home/features/features.component';
import {AboutComponent} from './home/about/about.component';
import {LoginAdminComponent} from './admin-dashboard/loginAdmin/login-admin.component';
import { LoginComponent } from './home/login/login.component';
import {RegisterComponent} from './home/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginAdminComponent },
      { path: 'detail/:id', component: DetailComponent }
    ]
  },
  {
    path: 'login/:id', component: LoginPagesComponent
  },
  { path: 'contact', component: ContactComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}

];
