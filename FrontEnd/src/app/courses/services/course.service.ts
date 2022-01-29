import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Course } from '../course.model';
import { Author } from '../course.model';

@Injectable({providedIn: 'root'})
export class CourseService {
  public courses: Array<Course>;
  //public readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {

  }

 getCourses() : Observable<Array<Course>> {  //Readt contact only
   
    return this.http.get<Array<Course>>('http://localhost:3000/courses');
  }

  getCoursesById(Id) : Observable<Array<Course>> {  //Readt contact only
    const id = CryptoJS.AES.decrypt(Id, 
      'testUsePasswordToEncryptionCookieOrAnyThing').toString(CryptoJS.enc.Utf8);
    const httpParams = new HttpParams({
      fromObject: {
        loginID: id
      }
    });
    return this.http.get<Array<Course>>("http://localhost:3000/courses", { params: httpParams });
  }


  getCoursesByid(Id) : Observable<Array<Course>> {  //Readt contact only
    const id = CryptoJS.AES.decrypt(Id, 
      'testUsePasswordToEncryptionCookieOrAnyThing').toString(CryptoJS.enc.Utf8);
    const httpParams = new HttpParams({
      fromObject: {
        id: id
      }
    });
    return this.http.get<Array<Course>>("http://localhost:3000/courses", { params: httpParams });
  }

  getAuthor() : Observable<Array<Author>> {  //Readt contact only
   
    return this.http.get<Array<Author>>('http://localhost:3000/Author');
  }

  UpdateCourse(contactId, updadatecontact) {  //Update contact in db
    return this.http.put('http://localhost:3000/courses/' + contactId, updadatecontact);
  }

  public createCourse(newCourse: Course) {
    return this.http.post<Course>('http://localhost:3000/courses', newCourse);
  }
/*
  public getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/courses/${courseId}`);
  }

  public updateCourse(oldCourse: Course, newCourse: Course): Subscription {
    return this.http.put<Course>(`${this.API_URL}/courses/${oldCourse.id}`, newCourse)
      .subscribe();
  }

  public removeCourse(courseId: number): Observable<{}> {
    return this.http.delete<Course>(`${this.API_URL}/courses/${courseId}`);
  }
  */
}
