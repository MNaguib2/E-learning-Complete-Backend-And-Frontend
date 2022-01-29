import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "src/app/AUTH/Service/auth.service";

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private AuthService : AuthService, 
        private router : Router){}

        canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot): any{
            return this.AuthService.isAuthenticated()
            .then(result => {
                if(!result){
                    return this.router.createUrlTree(['/']);
                }
                return result;
            }).catch(err => console.log(err));
        }
}