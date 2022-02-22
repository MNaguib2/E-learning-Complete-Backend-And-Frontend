import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { AuthService } from '../../../AUTH/Service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //providers: [AuthService]
})
export class HeaderComponent implements OnInit {
  LogInOut: boolean;
  userEmail: string = '' ;

  constructor(private router : Router, 
    private Authservic : AuthService, 
    private cookieService : CookieService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {    
    this.Authservic.UserRegistery.subscribe(data => {
      this.LogInOut = data ? true : false;
      if(data){
      this.userEmail = data.name;
      }
     });
  }
  public logOut(): void {
    this.userEmail = '';
    this.Authservic.logout();
  }

  MyCourse(){
    this.router.navigate(['ProfileAcount/Classes'],{relativeTo: this.route});
  }

  SignUp(){
    //console.log('test');
    this.router.navigate(['/signup']);
  }
}
