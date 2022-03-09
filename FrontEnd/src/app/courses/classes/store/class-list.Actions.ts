import { Action, createAction, props } from '@ngrx/store';
import { Classes, Material, Proffersor } from '../../services/Classes.model';

export const Request_Get_Classes = '[Class] Request Get All Classes From DataBase';
export const Get_Classes = '[Class] Get All Classes From DataBase';
export const Add_New_Class = '[Class] Add New Class';

export const Request_Add_New_Class = '[Class] Request Add New Class';
export const HandleError = '[error] Get Error from Classes Connection';
export const OnDistoryError = '[error] Destory Error After Exit from Page';

export const Request_GetAll_Proffessor = '[Proffesor] Request To Get All Proffessor';
export const GetAll_Proffessor = '[Proffesor] Get All Proffessor';

export const Request_GetAll_Material = '[Material] Request To Get All Material';
export const GetAll_Material = '[Material] Get All Material';


//*
export class RequestGetClasses implements Action {
    readonly type = Request_Get_Classes;
}

export class GetClasses implements Action {
    readonly type = Get_Classes;
    constructor(public classes: Classes[]) { }
}

export class AddNewClass implements Action {
    readonly type = Add_New_Class;
    constructor(public Class: Classes) { }
}

export class RequestAddNewClass implements Action {
    readonly type = Request_Add_New_Class;
    constructor(public Class: Classes) { }
}

export const handleError = createAction(
    HandleError,
    props<{ error: object; status: number }>()
);

export const DestoryError = createAction(
    OnDistoryError
);

export const RequestGetAllProffessor = createAction(
    Request_GetAll_Proffessor,
    //props<{Proffessor : Proffersor}>()
);

export const GetAllProffessor = createAction(
    GetAll_Proffessor,
    props<{Proffessor : Array<Proffersor>}>()
);
// this Action to Get First
export const RequestGetAllMaterial = createAction(
    Request_GetAll_Material,
);

export const GetAllMaterial = createAction(
    GetAll_Material,
    props<{Proffessor : Array<Material>}>()
);

export type ClassesAction = RequestGetClasses | GetClasses | AddNewClass | RequestAddNewClass ;