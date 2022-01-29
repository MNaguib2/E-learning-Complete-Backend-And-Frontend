import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './AUTH/login/login.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { CreatCourseComponent } from './courses/creat-course/creat-course.component';
import { AuthGuard } from './courses/services/AuthGuard.service';
import { LoginGuard } from './AUTH/Service/Login-Guard.service';
import { CoursesResolve } from './courses/services/courses-resolve.service';
import { SignUpComponent } from './AUTH/sign-up/sign-up.component';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'signup' , component: SignUpComponent},
  {path: 'courses' , canActivate: [AuthGuard], resolve:[CoursesResolve], 
  loadChildren: () => 
  import('./courses/course-routing.module').then(m => m.CourseRouting) },
  
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
