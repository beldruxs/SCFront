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
import {HomeNetComponent} from './net/home-net/home-net.component';
import { HomeNetGuard } from './home-net.guard';
import { EditProfileComponent } from './net/edit-profile/edit-profile.component';
import { PrivacyPolicyComponent } from './home/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './home/terms-of-service/terms-of-service.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  {
    path: 'admin',
    children: [
      { path: 'login', component: LoginAdminComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'login/u/:id', component: LoginPagesComponent
  },
  { path: 'contact', component: ContactComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {
    path: 'net',
    children: [
      { path: '', component: HomeNetComponent, canActivate: [HomeNetGuard] },
      { path: 'edit-profile', component: EditProfileComponent, canActivate: [HomeNetGuard] }
    ]
  },

];
