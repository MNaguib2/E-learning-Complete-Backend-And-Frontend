import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import * as ClassesAction from './class-list.Actions';
import { HostServer } from '../../../core/service/MainDataShare';
import { of, throwError } from "rxjs";
import { Professor } from "./class-list.reducer";
import { Proffersor } from "../../services/Classes.model";


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
                return of(ClassesAction.handleError({error : error.error, status: error.status}));
                //return throwError(error); 
            })
           )
        })
    )

    @Effect()
    AddClass = this.action$.pipe(
        ofType(ClassesAction.Request_Add_New_Class),
        switchMap((Class : ClassesAction.RequestAddNewClass) => {
            return this.http.post(`${HostServer}Classes/newClass`, Class, {observe: 'response'}).pipe(
                map((result : any) => {
                    if(result.status == 200) {
                        return new ClassesAction.AddNewClass(result.body.NewClass);
                    }                                         
                }),catchError((error: any) => {
                    console.log(error.error);
                    return of(ClassesAction.handleError({error : error.error, status: error.status}));
                })
            )
        })
    )
    @Effect(
        //{dispatch : false}
        )
    GetAllProffessorFromDB = this.action$.pipe(
        ofType(ClassesAction.Request_GetAll_Proffessor),
        switchMap(() => {
            return this.http.get(`${HostServer}Classes/GetAllProffessor`, {observe : 'response'}).pipe(
                map((result : any) => {
                   return ClassesAction.GetAllProffessor({Proffessor : result.body}) 
                }),catchError(error => {
                    console.log(error.error);
                    return of(ClassesAction.handleError({error : error.error, status: error.status}));
                })                    
            );
        })
    )

    GetAllMaterial$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ClassesAction.Request_GetAll_Material),
            switchMap(action => {
                console.log(action);
                return this.http.get(`${HostServer}Classes/GetAllMaterial`, {observe : 'response'}).pipe(
                    map(Materials => {
                        console.log(Materials);
                    })
                )
            })
        );
    },{ dispatch: false }
    )

    constructor(private action$: Actions, private http: HttpClient, private router: Router,
     private route: ActivatedRoute) { }
}