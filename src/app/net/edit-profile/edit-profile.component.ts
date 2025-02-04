import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  username: string = '';
  userProfile: any = {
    id: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    username: '',
    mail: '',
    telefono: '',
    profileImg: '',
    puntos: 0,
    lnotificable: false
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private titleService: Title) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
    if (this.username) {
      this.titleService.setTitle(`Click Aware | ${this.username}`);
    }
    this.apiService.getUserProfile(this.username).subscribe({
      next: (response) => {
        this.userProfile = response;
        // Map the response field correctly
        this.userProfile.lnotificable = response.lnotificable;
      },
      error: (error) => {
        console.error('Failed to fetch user profile', error);
      }
    });
  }

  saveProfile() {
    this.apiService.updateUserProfile(this.username, this.userProfile).subscribe({
      next: () => {
      },
      error: (error) => {
      }
    });
  }

  goBack() {
    this.router.navigate(['/net']);
  }
}
