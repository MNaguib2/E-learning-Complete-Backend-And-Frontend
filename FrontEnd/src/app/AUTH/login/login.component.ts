import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   userLogin: string;
   userPassword: string;
   posts: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userLogin = '';
    this.userPassword = '';
  }
  public logIn() {
    //*
    if (this.userLogin && this.userPassword) {
      this.authService.login(this.userLogin, this.userPassword);
    }
    //*/
    /*
    this.posts = {
      login : this.userLogin ,
      password : this.userPassword ,
      //id : 5
  };
  console.log(this.posts);
    this.authService.CreateContact(this.posts).subscribe(data =>{
      alert("user Login : " + this.userLogin + "user Password : " + this.userPassword);
    });
    //*/
  }  
}
