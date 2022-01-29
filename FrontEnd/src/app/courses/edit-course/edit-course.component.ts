import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course.model';
import { Author } from '../course.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { LoaderService } from '../../core/service/loader.service';
import * as CryptoJS from 'crypto-js';
import { AuthService } from 'src/app/AUTH/Service/auth.service';
declare var $: any;

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  Id: number;
  @Input() course: Course;
  title = "";
  Loading = false;
  isChecked = true;
  public Autor: Array<Author>;
  test = [];
  //isLoading: Subject<boolean> = this.loaderService.isLoading;
  //data: Observable<any>;
  constructor(private service: CourseService, 
    private activatedRoute: ActivatedRoute,
    private router : Router, 
    private loaderService: LoaderService,
    private AutherService : AuthService) {
    this.activatedRoute.params.subscribe(data => {
      this.Id = data.id;
    });
    this.service.getCoursesByid(this.Id).subscribe(data => {
      this.course = data[0];
      //console.log(this.course);
      this.Loading = true;
      //console.log(this.Loading);
      //console.log(this.course);
    });
    this.service.getAuthor().subscribe(data => {
      this.Autor = data;
      console.log(
        //this.Autor.map(v=>{
        //console.log(this.course.authors.includes(v.id));
        //this.test = this.course.authors.includes(v.id);
        //return this.course.authors.includes(v.id)
        //return  this.test = this.course.authors.includes(v.id);
        //})
        //this.test[0]
      );
    });
  }

  ngOnInit() {

  }
  //compare two array 
  includes(container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
      returnValue = true;
    }
    return returnValue;
  }

  /* all this code to get value from css get number width heigt by px after or during run project
  i = 1;
  f = 1;
  l = 1;
  p=1;
  countLines1() {
    console.log("hello 1 " + this.i+"\n first Item "+this.f);
    this.i++;
    this.f++;
    // var el = document.getElementById("content1");
    // var divHeight = el.offsetHeight;
    // console.log("1"+divHeight);
    // var lineHeight = parseInt(el.style.lineHeight);
    // console.log("1"+lineHeight);
    // var lines = divHeight / lineHeight;
    // //alert("Lines: " + lines);
    // console.log("1"+lines);
  }
  countLines2() {
    console.log("hello 2 " + this.i+"\n last Item "+this.l);
    this.i++;
    this.l++;
  //  var el = document.getElementById("content2");
  //  var divHeight = el.offsetHeight;
  //  console.log("2"+divHeight);
  //  var lineHeight = parseInt(el.style.lineHeight);
  //  console.log("2"+lineHeight);
  //  var lines = divHeight / lineHeight;
  //  //alert("Lines: " + lines);
  //  console.log("2"+lines);
  }
  countLines3() {
    console.log("hello Parent " + this.p);
    this.p++;
  //  var el = document.getElementById("content2");
  //  var divHeight = el.offsetHeight;
  //  console.log("2"+divHeight);
  //  var lineHeight = parseInt(el.style.lineHeight);
  //  console.log("2"+lineHeight);
  //  var lines = divHeight / lineHeight;
  //  //alert("Lines: " + lines);
  //  console.log("2"+lines);
  }
  //*/
  changecheckbox() {
    $("div.row input[type = 'checkbox']").map((x, y, m) => {
      return this.test.push(y.checked);
    });
    //console.log(this.checkBoxf.length);
    //console.log(this.test);
    if (this.test.includes(true)) {
      //$("div input[type = 'checkbox']").required = true;
      //$("div input[type = 'checkbox']").attributes["required"] = "true";   
      //$("div.row").css("border","3px solid gray");
      $("h2 input[type = 'checkbox']").attr("disabled", false);
      //console.log("trrrrrrrrrrrrrrrrrrrrrrrrrrrrue");
      //$("#checkAutho").valid = true;
      //EditeForm.status ="valid";
      //console.log(EditeForm);
      //$("#checkAutho").required = "valid";      
    } else {
      //$("div input[type = 'checkbox']").css("border","3px solid black");
      $("h2 input[type = 'checkbox']").attr("disabled", true);
      //"disabled", true  
      //$("div input[type = 'checkbox']").prop('required', false);
      //console.log("falllllllllllllllllse");
      this.isChecked = false;
    }
    //$("div input[type = 'checkbox']").required = true;
    this.test = [];
  }

  checkBoxf: Array<any> = [];
  checkBoxs: Array<number> = [];
  finishObjective = {
    "title": "",
    "date": "",
    "duration": "",
    "isTopRated": true,
    "authors": [],
    "description": ""
  };
  EditeCourse(EditeForm: NgForm) {
    /*
    console.log(EditeForm);
    console.log(EditeForm.value.title);
    console.log(EditeForm.value.date);
    console.log(EditeForm.value.Duration);
    //*/
    $('input[name ="checkAutho"]').map((x, v, p) => {
      return this.checkBoxf.push(v.checked);
    });
    var i = 1;
    //console.log(this.checkBoxf);
    while (this.checkBoxf.length + 1 >= i) {
      if (this.checkBoxf[i - 1]) {
        this.checkBoxs.push(i);
      }
      i++;
    }    
    
    this.finishObjective = {
      "title": EditeForm.value.title,
      "date": EditeForm.value.date,
      "duration": EditeForm.value.Duration,
      "isTopRated": true,
      "authors": this.checkBoxs,
      "description": EditeForm.value.discription
    };
    this.checkBoxf = [];
    this.checkBoxs = [];
    //console.log(this.finishObjective);
    this.service.UpdateCourse(this.Id ,this.finishObjective).subscribe(data => {
      const id = CryptoJS.AES.encrypt((this.AutherService.userData$.getValue()[0].id).toString(),
       'testUsePasswordToEncryptionCookieOrAnyThing').toString();      
      this.router.navigate(['../../' , id], {relativeTo : this.activatedRoute})
      // .then(() => { //this code to avoid reload page
      //   window.location.reload();
      // });
    });
  }
}
////console.log((<HTMLInputElement[]><any>document.getElementsByName('checkAutho')))
//json-server --watch .\db.json
//cd .\src\assets 

