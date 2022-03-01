import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { HostServer } from '../../core/service/MainDataShare';


//this maded modifie to can work in response from backend
export interface User {
  name: string;
  id: any;
  type: number;
  Gender: string;
  DataBorn: Date;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly API_URL = HostServer;
  public userData$ = new BehaviorSubject<any>('');
  //public UserRegistery = new Subject<User>();
  public UserRegistery = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) { }

  // this is finished use to replace by backend 
  public login(login: string, password: string): void {
    const httpParams = new HttpParams({
      fromObject: {
        username: login,
        password: password
      }
    });
    this.http.get(`${this.API_URL}/login`, { params: httpParams })
      .subscribe((result: any) => {
        if (result.length >= 1) {
          //localStorage.setItem('currentUser', JSON.stringify(result));//update this use token
          const Name = CryptoJS.AES.encrypt((result[0].id).toString(), 'testUsePasswordToEncryptionCookieOrAnyThing').toString();
          this.userData$.next(result);
          this.cookieService.set('User', JSON.stringify(Name), { expires: new Date(new Date().getTime() + 10800000) });
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
    /* this is comment to replace code by another work with backend
    this.cookieService.deleteAll('/');
    this.userData$.next("");
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
      //*/
    this.cookieService.deleteAll('/');
    this.UserRegistery.unsubscribe();
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }

  public isAuthenticated(): Promise<any> {
    const Authenticated = new Promise((resolve, rejected) => {
      const Login = this.cookieService.check('User');
      resolve(Login);
    })
    return Authenticated;
  }
  /*  this Code is comment to resone some problem when use new backend
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
  ///*/

  /*this is New Code to connect with internal API */
  PostSignUp(Data: FormData) {
    return this.http.post(this.API_URL + 'Admin/SigUp', Data, { observe: 'response' });
  }
  getRestPass(email: string) {
    return this.http.get(this.API_URL + 'Admin/RestPassword/' + email, { observe: 'response' });
  }
  getConfirmActivation(Token: string, id: string) {
    return this.http.get(`${this.API_URL}Confirm/${Token}/${id}`, { observe: 'response' })
  }
  postNewPassword(username: string, password: string, confirmpassword: string, url: string) {
    //console.log(username, password, confirmpassword)
    return this.http.post(this.API_URL + 'Confirm/ActiveNewPassword/' + url,
      { username: username, password: password, confirmPassword: confirmpassword }, { observe: 'response' });
  }
  PostSignIn(username: string) {
    return this.http.post(`${this.API_URL}Admin/SignIn`, { username: username }, { observe: 'response' });
  }
  PostSendPassword(password: string, username: string) {
    return this.http.post(`${this.API_URL}Admin/Login`, { password: password, username: username }, { observe: 'response' });
  }
  LogIN(UserData: User, Token: string) {
    //console.log(Token);
    this.cookieService.set('User', Token, { expires: new Date(new Date().getTime() + 3600000),path: '/' });
    this.UserRegistery.next(UserData);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/courses']);
    window.location.reload();
  }
  public AutoLoginWithBackEnd(Token: string) {
     this.http.get(`${this.API_URL}Admin/AutoLogin/${Token}`).subscribe((data: any) => {
      this.UserRegistery.next(data.UserData);
    }, error => {
      alert(error.error.message);
      this.logout();
    })
  }
}
