import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './AUTH/Service/AuthGuard.service';
import { LoginGuard } from './AUTH/Service/Login-Guard.service';
import { CoursesResolve } from './courses/services/courses-resolve.service';


const routes: Routes = [
  { path: '',  canActivate: [LoginGuard] , loadChildren: () => 
  import('./AUTH/Service/Auth-routing.module.ts').then(m => m.AuthRouting)},
  
  {path: 'ProfileAcount' , canActivate: [AuthGuard], resolve:[CoursesResolve],
  /* remove comment from resolve to edite can work with backend */
  loadChildren: () => 
  import('./courses/course-routing.module').then(m => m.CourseRouting) },
  
  { path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
