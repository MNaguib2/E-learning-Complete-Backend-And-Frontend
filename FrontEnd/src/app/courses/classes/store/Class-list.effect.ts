import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as ClassesAction from './class-list.Actions';
import { HostServer } from '../../../core/service/MainDataShare';
import { of, throwError } from "rxjs";


@Injectable()
export class ClassEffect {
    @Effect()
    getClasses= this.action$.pipe(
        ofType(ClassesAction.Request_Get_Classes),
        switchMap(() => {
           return this.http.get(`${HostServer}Classes/GetAllClasses`).pipe(
               map((resultClasses : any) => {
                   return new ClassesAction.GetClasses(resultClasses.result)
               }),catchError((error: any) => {
                //console.log(error);                
                return of(ClassesAction.handleError({error : error.error, status: error.status}));
                //return throwError(error); 
            })
           )
        })
    )

    @Effect({dispatch: false})
    AddClass = this.action$.pipe(
        ofType(ClassesAction.Add_New_Class),
        switchMap((Class : ClassesAction.AddNewClass) => {
            console.log('Class');
            return this.http.post(`${HostServer}Classes/newClass`, Class).pipe(
                map(result => {
                   return console.log(result)
                    
                })
            )
        })
    )
    constructor(private action$: Actions, private http: HttpClient, private router: Router,
     private route: ActivatedRoute) { }
}