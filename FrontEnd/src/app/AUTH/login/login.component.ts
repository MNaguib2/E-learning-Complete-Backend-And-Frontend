import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../core/service/loader.service';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import { PlaceHolderDirective } from 'src/app/core/service/place-holder.directive';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';

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

  constructor(private authService: AuthService, private router: Router,
    private LoaderService: LoaderService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.userLogin = '';
    this.userPassword = '';
  }
  ngOnDestroy(): void {

  }
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost!: PlaceHolderDirective;
  public logIn() {
    //
    if (this.userLogin && this.userPassword) {
      this.subscribe = this.authService.PostSignIn(this.userLogin).pipe(
        exhaustMap((respo: any) => {
          //console.log(respo);
          const encryptPassword = CryptoJS.AES.encrypt(this.userPassword, respo.body.signature).toString();
          return this.authService.PostSendPassword(encryptPassword, this.userLogin)
        })
      ).subscribe((data: any) => {
        //console.log(data);
        this.subscribe.unsubscribe();
        if (data.status == 202) {
          this.authService.LogIN(data.body.UserData, data.body.Token);                 
        }
      }, err => {
        this.ShowErrorMesage(err);
      });
    }
  }
  ShowErrorMesage(error) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponent);
    const hostViewContainerRef = this.alertHost.viewError;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
    componentRef.instance.StatusCode = error.status;
    componentRef.instance.Error = error.error.message;
  }
}
