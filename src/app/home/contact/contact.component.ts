import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NgClass} from '@angular/common';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    NgClass,
    SpinnerComponent
  ],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Click Aware | Contacto');
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isLoading = true;
      const formData = this.contactForm.value;
      console.log(formData);
      this.apiService.submitContactForm(formData).subscribe(
        (response: any) => {
          console.log(response);
          this.snackBar.open('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.', 'Cerrar', {
            duration: 5000,
          });
          this.contactForm.reset();
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error al enviar el formulario', error);
          this.snackBar.open('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.', 'Cerrar', {
            duration: 5000,
          });
          this.isLoading = false;
        }
      );
    }
  }
}
