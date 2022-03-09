import { createReducer, on } from '@ngrx/store';
import { Classes, Proffersor } from '../../services/Classes.model';
import * as ClassesAction from './class-list.Actions';

export const initialState: Array<Classes> = [{
    Detials: '',
    Material: [],
    Name: '',
    Note: '',
    _id: ''
}]
//* this is comment to event error when use and website record another code 
export function ClassReducer(state: Array<Classes> = initialState, action: ClassesAction.ClassesAction) {
    switch (action.type) {
        case ClassesAction.Get_Classes:
            return action.classes;

        case ClassesAction.Add_New_Class : 
            if(state.length > 0 && state[0]._id === ''){
                return [action.Class]
            }
            return [...state, action.Class]
            default:
            return state
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
    initialStateError,
    on(ClassesAction.handleError, (statue, action) =>   ({...statue, error: action.error ,status : action.status})),
    on(ClassesAction.DestoryError, (statue) => ({...statue , error : null , status : null}))
  );

  export const InitialStaueProffessor : Array<Proffersor> = [{
      DataBorn : new Date(),
      Name : '' ,
      _id: '',
      detials : '',
      email : '' ,
      userName: ''
  }]

  export const Professor = createReducer(
    InitialStaueProffessor,
    on(ClassesAction.GetAllProffessor, (statue, action) => (action.Proffessor))
  );