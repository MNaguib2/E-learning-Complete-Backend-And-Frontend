import { Action, createAction, props } from '@ngrx/store';
import { Classes } from '../../services/Classes.model';

export const Request_Get_Classes = '[Class] Request Get All Classes From DataBase';
export const Get_Classes = '[Class] Get All Classes From DataBase';
export const Add_New_Class = '[Class] Add New Class'
export const HandleError = '[error] Get Error from Classes Connection'
export const OnDistoryError = '[error]Destory Error After Exit from Page'


//*
export class RequestGetClasses implements Action {
    readonly type = Request_Get_Classes;
}

export class GetClasses implements Action {
    readonly type = Get_Classes;
    constructor(public classes : Classes[]){}
}

export class AddNewClass implements Action {
    readonly type = Add_New_Class;
    constructor(public Class : Classes){}
}
export const handleError = createAction(
    HandleError,
    props<{ error: object; status : number }>()
  );
  export const DestoryError = createAction(
    OnDistoryError
  );

 export type ClassesAction = RequestGetClasses | GetClasses | AddNewClass;