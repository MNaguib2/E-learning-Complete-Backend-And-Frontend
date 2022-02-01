import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../AUTH/login/login.component';
import { NewsComponent } from './news/news.component';






@NgModule({
  declarations: [ NewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    
  ],
  exports: [
    //LoginComponent
  ],
})
export class LoginModule { }
