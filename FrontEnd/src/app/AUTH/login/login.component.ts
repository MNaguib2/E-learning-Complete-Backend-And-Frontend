import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  userLogin: string;
  userPassword: string;
  posts: any;
  subscribe: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userLogin = '';
    this.userPassword = '';
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  public logIn() {
    //
    if (this.userLogin && this.userPassword) {
      this.subscribe = this.authService.PostSignIn(this.userLogin).subscribe((data: any) => {
        console.log(data.body.signature);
        const encryptPassword = CryptoJS.AES.encrypt(this.userPassword, data.body.signature).toString();
        this.authService.PostSendPassword(encryptPassword, this.userLogin).subscribe((dataconfirm: any) => {
          console.log(dataconfirm);
          //this.router.navigate(['/'])
          this.subscribe.unsubscribe();
        });
      });
      //window.location.reload();
    }
  }
}
