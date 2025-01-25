import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
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
        console.log('Profile updated successfully');
      },
      error: (error) => {
        console.error('Failed to update profile', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/net']);
  }
}
