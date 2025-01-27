import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { NgClass, NgIf } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  notificationMessage: string | null = null;
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Click Aware | Registro');
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: [''],
      username: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefonoPrefix: ['+34', [Validators.required, Validators.pattern(/^\+\d{1,3}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      frecuencia: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const fullPhoneNumber = `${formValue.telefonoPrefix}${formValue.telefono}`;
      const registerData = { ...formValue, telefono: fullPhoneNumber };

      this.apiService.register(registerData).subscribe(
        response => {
          this.notificationMessage = 'User registered successfully!';
          this.isError = false;
          this.cdr.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error => {
          this.notificationMessage = error.error || 'Error registering user';
          this.isError = true;
          this.cdr.detectChanges();
        }
      );
    }
  }
}
