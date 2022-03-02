import { createReducer, on } from '@ngrx/store';
import { Classes } from '../../services/Classes.model';
import * as ClassesAction from './class-list.Actions';

export const initialState: Array<Classes> = [{
    Detials: '',
    Material: [],
    Name: '',
    Note: ''
}]
//* this is comment to event error when use and website record another code 
export function ClassReducer(state: Classes | any = initialState, action: ClassesAction.ClassesAction) {
    switch (action.type) {
        case ClassesAction.Get_Classes:
            return action.classes;
        case ClassesAction.Add_New_Class:
            return [...state, action.Class]
    }
}
//*/

export interface Error{
    error : object,
    status : number
  }

  export const initialStateError: Error = {
        error : null,
        status: null
}

export const handleError = createReducer(
    initialState,
    on(ClassesAction.handleError, (statue, action) =>   ({...statue, error: action.error ,status : action.status})),
    on(ClassesAction.DestoryError, (statue) => ({...statue , error : null , status : null}))
  );
