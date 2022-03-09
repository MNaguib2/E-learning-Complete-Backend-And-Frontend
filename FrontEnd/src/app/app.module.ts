import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LoaderService } from './core/service/loader.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/service/loader.interceptor';
import { ErrorComponent } from './core/components/error/error.component';
import { AuthModule } from './AUTH/Service/Auth.module';
import { CoursesModule } from './courses/Courses.module';
import { StoreModule }  from '@ngrx/store';
import { ClassReducer, handleError, Professor } from './courses/classes/store/class-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClassEffect } from './courses/classes/store/Class-list.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
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
    AuthModule,
    CoursesModule,
    StoreModule.forRoot({ClassesList : ClassReducer, ErrorMessage : handleError, Professor : Professor}),
    EffectsModule.forRoot([ClassEffect])

  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
