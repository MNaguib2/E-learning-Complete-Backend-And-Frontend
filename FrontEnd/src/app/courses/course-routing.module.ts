import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsComponent } from "../core/components/MainPage/news.component";
import { ClassesComponent } from "./classes/classes.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { DetialsComponent } from "./detials/detials.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";

const routes :Routes = [
    { path: '', component: NewsComponent },
    { path: 'Edite/:id', component: EditCourseComponent },
    { path: 'Classes', component:  ClassesComponent },
    { path: ':idUser', component: CoursesListComponent},
    { path: ':idUser/Detials', component: DetialsComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class CourseRouting {}