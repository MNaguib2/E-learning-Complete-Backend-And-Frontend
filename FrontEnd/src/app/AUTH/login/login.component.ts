import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../core/service/loader.service';

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

  constructor(private authService: AuthService, private router: Router, private LoaderService : LoaderService) { }

  ngOnInit(): void {
    this.userLogin = '';
    this.userPassword = '';
  }
  ngOnDestroy(): void {

  }
  public logIn() {
    //
    if (this.userLogin && this.userPassword) {
      this.subscribe = this.authService.PostSignIn(this.userLogin).subscribe((data: any) => {
        const encryptPassword = CryptoJS.AES.encrypt(this.userPassword, data.body.signature).toString();
        this.authService.PostSendPassword(encryptPassword, this.userLogin).subscribe((dataconfirm: any) => {
          this.authService.LogIN(dataconfirm.body.UserData , dataconfirm.body.Token);          
          this.subscribe.unsubscribe();
        });
      });
      //window.location.reload();
    }
  }
}
