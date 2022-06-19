import { Component, Input, OnInit, OnDestroy, AfterContentInit, Inject, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, fromEvent, Observable } from 'rxjs';
import { Course } from '../course.model';
import { CourseService } from '../services/course.service';
import { AuthService } from 'src/app/AUTH/Service/auth.service';
import * as CryptoJS from 'crypto-js';
declare var $: any;

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, AfterViewChecked  {
  constructor(
    //private filterPipe: FilterPipe,
    private courseService: CourseService,
    private router: Router,
    private route : ActivatedRoute,
    private cookieService:CookieService,
    private AuthServic : AuthService,
  ) { }
  
  public searchTerm: string;
  public courses: Array<Course> = [];
  course : Course  ;
  private searchSubscription: Subscription;
  private searchText$ = new Subject<string>();
  //public limit: number;
  public step: number;
  public isLastPage = false;
  content : Array<string> = [];
  isContentToggled: Array<boolean> = [];
  nonEditedContent: Array<string> = [];
  limit: number = 100;
  limit2: number = 100;
  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription
   id;

  ngOnInit() {
    this.step = 5;
    //this.limit = this.step;
    this.searchTerm = '';
    const type = this.AuthServic.userData$.getValue()[0].type;
    if(type == 'Admin'){
      this.courseService.getCourses().subscribe(data  => {
        this.courses = data;
        for (var i= 0; i < this.courses.length; i++){
          this.course = this.courses[i];
          //this.content.push(this.course.description);
          this.nonEditedContent.push(this.course.description);
          this.limit = this.nonEditedContent[i].substr(0, this.limit2).lastIndexOf(' ');
          //console.log(this,this.limit);
          if(this.limit > 0){
            this.content[i] = `${this.nonEditedContent[i].substr(0, this.limit)}...`;
            }else {
              this.content[i] = this.nonEditedContent[i];
            }
          this.isContentToggled.push(false);          
        }
      }); 
    }else{
    this.courseService.getCoursesById(this.route.snapshot.params.idUser).subscribe(data  => {
      this.courses = data;
      for (var i= 0; i < this.courses.length; i++){
        this.course = this.courses[i];
        //this.content.push(this.course.description);
        this.nonEditedContent.push(this.course.description);
        this.limit = this.nonEditedContent[i].substr(0, this.limit2).lastIndexOf(' ');
        if(this.limit > 0){
          this.content[i] = `${this.nonEditedContent[i].substr(0, this.limit)}...`;
          }else {
            this.content[i] = this.nonEditedContent[i];
          }
        this.isContentToggled.push(false);
      }
    }); }   
    /*
    this.courseService.getCourses(this.searchTerm, this.limit)
    .subscribe(
      (data) => this.setCourses(data),
      (error) => console.log(error)
      );
      
      this.searchSubscription = this.searchText$.pipe(
        map((text) => text.length >= 3 ? text : ''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((courseName) => (
          this.courseService.getCourses(courseName, this.step)
          ))
          ).subscribe((data) => {
            this.limit = this.step;
            this.isLastPage = false;
            this.setCourses(data);
          });
          //*/
        }
        ngAfterViewChecked(){
          //I will Back to made another way custome directive to hide readMore If content equale none edite and to learn this task 0001
         for (let index = 0; index < this.nonEditedContent.length; index++) {
           if(this.content[index] == this.nonEditedContent[index]){
              $(`#M${index}`).remove();
           }           
         }
        }
        Detials(Id : any){
          const id =  CryptoJS.AES.encrypt((Id).toString(), 'testUsePasswordToEncryptionCookieOrAnyThing').toString(); 
          this.router.navigate(['Detials'], {relativeTo: this.route, queryParams: { id: id }})
        }

        public findCourses(textFragment: string): void {
          this.searchTerm = textFragment;
          //this.searchText$.next(this.searchTerm.trim());          
          console.log(this.searchTerm);        
        }
        //*
        toggleContent(id : number = 1) {
          
          this.isContentToggled[id] = !this.isContentToggled[id];
          
          this.limit = this.nonEditedContent[id].substr(0, this.limit2).lastIndexOf(' ');
          
          this.content[id] = this.isContentToggled[id] ? this.nonEditedContent[id] : 
          this.content[id] = `${this.nonEditedContent[id].substr(0, this.limit)}...`;
          if(this.isContentToggled[id]){
            document.getElementById(`C${id}`).style.height = "auto";
          }else{
            document.getElementById(`C${id}`).style.height = "19rem";
          }
          
          
          //console.log(this.isContentToggled);
        }
        //*/
        public setCourses(courses: Array<Course>): void {
          if (
            courses.length < this.limit ||
            (this.courses.length && this.courses[this.courses.length - 1].id) === courses[courses.length - 1].id
            ) {
              this.isLastPage = true;
            }
            this.courses = courses;
          }
          
          sendCreatPage() {
            this.router.navigate(['create'] , {relativeTo: this.route});
          }
        }
        