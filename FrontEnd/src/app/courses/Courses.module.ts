import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModule } from "../AUTH/Service/Auth.module";
import { ClassesComponent } from "./classes/classes.component";
import { CourseRouting } from "./course-routing.module";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { DetialsComponent } from "./detials/detials.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { AddMaterialComponent } from './add-material/add-material.component';
import { AddClassesComponent } from './add-classes/add-classes.component';
import {MatSelectModule, MatFormFieldModule} from '@angular/material';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    declarations:[
        CoursesListComponent,
        EditCourseComponent,
        ClassesComponent,
        DetialsComponent,
        AddMaterialComponent,
        AddClassesComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CourseRouting,
        ReactiveFormsModule,
        AuthModule,
        MatSelectModule, 
        MatFormFieldModule,
        MatSelectFilterModule
    ],
    providers: [

    ]
})

export class CoursesModule{

}