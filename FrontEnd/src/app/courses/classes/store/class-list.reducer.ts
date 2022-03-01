import { createReducer, on } from '@ngrx/store';
import { Classes } from '../../services/Classes.model';
import * as ClassesAction from './class-list.Actions';

export const initialState : Array<Classes> = [{
    Detials : '',
    Material : [] ,
    Name : '',
    Note : ''
}] 
//* this is comment to event error when use and website record another code 
export function ClassReducer(state : Classes | any = initialState , action : ClassesAction.ClassesAction ){
    switch (action.type){
        case ClassesAction.Get_Classes :
        return null;
    }
} 
//*/