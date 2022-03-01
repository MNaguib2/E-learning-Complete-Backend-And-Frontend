import { Injectable } from "@angular/core";
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { LoaderService } from './loader.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService, private cookie: CookieService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    /*
    {
        this.loaderService.show();
        return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
    }
    // here will use another way to made interceptor */
    {
        const token = this.cookie.check('User') ? this.cookie.get('User') : ''
        //console.log(token);
     const modifeUrl = req.clone({
         headers: req.headers.set('Token' , token)
     })
        return next.handle(modifeUrl).pipe(
            tap(event => {
                //console.log(HttpEventType)
             if(event.type === HttpEventType.Sent){            
                this.loaderService.show(); 
             }else if(event.type === HttpEventType.Response){
                this.loaderService.hide(); 
             }
            }, err => {
                this.loaderService.hide();
            })//, finalize(() => this.loaderService.hide()) // Ihave three way to LoadSpinner in this one and another in secShop another way and in E-learning Another way 
         ) 
    }
}