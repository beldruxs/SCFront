import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [
    FormsModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  username: string | null = '';
  email: string = '';
  preferences: any = {}; // Add your preferences structure here

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.email = sessionStorage.getItem('email') || ''; // Assuming email is stored in sessionStorage
    // Load preferences from sessionStorage or API
  }

  saveProfile(): void {
    // Save profile data to sessionStorage or send to API
    sessionStorage.setItem('username', this.username!);
    sessionStorage.setItem('email', this.email);
    // Save preferences
    alert('Profile updated successfully');
    this.router.navigate(['/net']);
  }
}
