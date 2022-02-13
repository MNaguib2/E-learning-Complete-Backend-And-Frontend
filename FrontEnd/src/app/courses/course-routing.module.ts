import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsComponent } from "../login/news/news.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CreatCourseComponent } from "./creat-course/creat-course.component";
import { DetialsComponent } from "./detials/detials.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";

const routes :Routes = [
    { path: '', component: NewsComponent},
    { path: 'Edite/:id', component: EditCourseComponent},
    { path: ':idUser/create', component:  CreatCourseComponent},
    { path: ':idUser', component: CoursesListComponent},
    { path: ':idUser/Detials', component: DetialsComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class CourseRouting {}