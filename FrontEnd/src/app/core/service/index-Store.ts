import * as ClassReducer from '../../courses/classes/store/class-list.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { Classes }  from '../../courses/services/Classes.model';


export const rootReducer = {};

export interface AppState {
    ClassesList: Classes;
};


export const reducers: ActionReducerMap<AppState , any> = {
    ClassesList: ClassReducer.ClassReducer
}
