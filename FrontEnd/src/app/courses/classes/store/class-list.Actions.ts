import { Action } from '@ngrx/store';

export const Get_Classes = '[Class] Get All Classes From DataBase';

//*
export class GetClasses implements Action {
    readonly type = Get_Classes;
}

 export type ClassesAction = GetClasses;