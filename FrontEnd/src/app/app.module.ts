import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoginModule } from './login/login.module';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LoaderService } from './core/service/loader.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/service/loader.interceptor';
import { CreatCourseComponent } from './courses/creat-course/creat-course.component'; 
import { CourseRouting } from './courses/course-routing.module';
import { AuthGuard } from './courses/services/AuthGuard.service';
import { DetialsComponent } from './courses/detials/detials.component';
import { SignUpComponent } from './AUTH/sign-up/sign-up.component';
import { ErrorComponent } from './core/components/error/error.component';
import { PlaceHolderDirective } from './core/service/place-holder.directive';

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
    SignUpComponent,
    ErrorComponent,
    PlaceHolderDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginModule,
    MatProgressSpinnerModule,
    CourseRouting
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
