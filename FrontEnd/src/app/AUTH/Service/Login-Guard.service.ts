import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/AUTH/Service/auth.service';

@Injectable({providedIn: 'root'})

export class LoginGuard implements CanActivate {
    constructor(private authservice : AuthService, private router : Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : any {
       return this.authservice.isAuthenticated()
       .then(result => {
            if(result){
                return this.router.createUrlTree(['/courses']);
            }
                return !result;                       
       }).catch(err => console.log(err))
    }
}