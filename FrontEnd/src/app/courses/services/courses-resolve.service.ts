import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, UrlTree, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as AuthServic  from '../../AUTH/Service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })

export class CoursesResolve implements Resolve<any> {
    constructor(private Authserver : AuthServic.AuthService, private cookieService:CookieService){}     
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        
          //this comment to replace this by code connection with backend
         //return this.Authserver.AutoLogin(this.cookieService.get('User')); 
         /*
        .then(async (result) => {
            if(result){
                if(this.Authserver.userData$.value == ''){
                     await this.Authserver.AutoLogin(CryptoJS.AES.decrypt(this.cookieService.get('User').slice(1, -1),
                     'testUsePasswordToEncryptionCookieOrAnyThing').toString(CryptoJS.enc.Utf8))
                     .then(result => {
                        this.data = result;
                        if(this.data.length > 0){
                            return this.Authserver.userData$.next(this.data);
                        }else{
                          alert('Please Try Login');
                          this.cookieService.deleteAll();
                          location.reload();
                          return this.Authserver.userData$.next('');
                        }
                     })
                     .catch(err => console.log(err));                     
                }                
            }                                        
        }).catch((err) => {
            console.log(err);
        });
        //*/
        this.Authserver.AutoLoginWithBackEnd(this.cookieService.get('User'));
    }
}