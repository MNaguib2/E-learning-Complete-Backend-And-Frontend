import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LoaderService } from './core/service/loader.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/service/loader.interceptor';
import { CreatCourseComponent } from './courses/creat-course/creat-course.component'; 
import { CourseRouting } from './courses/course-routing.module';
import { DetialsComponent } from './courses/detials/detials.component';
import { ErrorComponent } from './core/components/error/error.component';
import { AuthModule } from './AUTH/Service/Auth.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CoursesListComponent,
    EditCourseComponent,
    LoaderComponent,
    CreatCourseComponent,
    DetialsComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    CourseRouting,
    AuthModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
