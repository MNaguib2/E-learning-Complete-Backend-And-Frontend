import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, EMPTY, Subscription, Observer } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { take, tap } from 'rxjs/operators';

export interface User {
  name : string;
  id : number;
  username : string;
  password : string;
  type : string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly API_URL = 'http://localhost:3000/Admin';
  public userData$ = new BehaviorSubject<any>('');

  constructor(
    private router : Router,
    private http: HttpClient, 
    private cookieService:CookieService,
    private route : ActivatedRoute
    ) { }


  public login(login: string, password: string): void {
    const httpParams = new HttpParams({
      fromObject: {
        username : login,
        password : password
      }
    });
    this.http.get(`${this.API_URL}/login`, {params : httpParams})
      .subscribe( (result: any) => {
        if(result.length >= 1){
          //localStorage.setItem('currentUser', JSON.stringify(result));//update this use token
          const Name = CryptoJS.AES.encrypt((result[0].id).toString(), 'testUsePasswordToEncryptionCookieOrAnyThing').toString();
          this.userData$.next(result);
          this.cookieService.set('User',JSON.stringify(Name), {expires : new Date(new Date().getTime()+ 10800000)});
          /*NOt very ver very Important in added cookie mush kowledge different time between your country and country google company 
          two hour and every hour equal in program Language 3600000 two made cookie expire after one hour must multi this number in 3
          such as new Date(new Date().getTime()+ (3600000*3)) or use normal number .125 */
          this.router.navigateByUrl('/courses');

        }
        },
        error => console.log('No user found with such login and/or password.')
        );
  }


  public logout() {
    this.cookieService.deleteAll('/');
    this.userData$.next("");
    this.router.navigate(['/']) 
    .then(() => {
      window.location.reload();
    });
  }

  public isAuthenticated() : Promise<any> {
   const Authenticated = new Promise((resolve , rejected) => {
     const Login = this.cookieService.check('User');
    resolve(Login);
   })
    return Authenticated;
  }

  public AutoLogin(id: string) : Observable<User> {
    const Id = CryptoJS.AES.decrypt(id.slice(1, -1),
        'testUsePasswordToEncryptionCookieOrAnyThing').toString(CryptoJS.enc.Utf8);

    const httpParams = new HttpParams({
      fromObject: {
        id : Id
      }
    });
    return this.http.get<User>(`${this.API_URL}/login`, {params : httpParams})
    .pipe(take(1),tap((result:any) => {
      if(result.length > 0){
        return this.userData$.next(result);
      }else {        
        this.cookieService.delete('User');
        alert('Please Try Login');
        this.cookieService.deleteAll('/');
        this.router.navigate(['/']);
      }        
    })
    )
  }
  PostSignUp(Data : FormData){
   return this.http.post(this.API_URL+'/SigUp' , Data);
  }
}
