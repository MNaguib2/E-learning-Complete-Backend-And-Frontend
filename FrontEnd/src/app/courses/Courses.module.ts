import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ClassesComponent } from "./classes/classes.component";
import { CourseRouting } from "./course-routing.module";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { DetialsComponent } from "./detials/detials.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";

@NgModule({
    declarations:[
        CoursesListComponent,
        EditCourseComponent,
        ClassesComponent,
        DetialsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        CourseRouting
    ],
    providers: [

    ]
})

export class CoursesModule{

}