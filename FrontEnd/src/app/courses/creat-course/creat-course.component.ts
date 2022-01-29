import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Author, Course } from '../course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-creat-course',
  templateUrl: './creat-course.component.html',
  styleUrls: ['./creat-course.component.scss']
})
export class CreatCourseComponent implements OnInit {
  Autor: Array<Author>;
  AutherSelected = [];
  constructor(private service: CourseService, private router: Router,
    private route : ActivatedRoute,
    private httpClientModule : HttpClientModule) {
    this.service.getAuthor().subscribe(data => {
      this.Autor = data;

      /*
      for (let index = 0; index < data.length; index++) {
        this.one.addControl( `${index}` , new FormControl(data[index]));////this commite to try use formGroup
        this.two.addControl( `${index}` , new FormControl(false));        
      }
      //*/

    });
  }
  CreatForm: NgForm;
  /*
  CreatForm : FormGroup;
   one :  FormGroup;
   two : FormGroup;
   //*/
  ngOnInit(): void {
    /*  this code to try or learn expert reactive form
        this.CreatForm = new FormGroup({
          title: new FormControl(null, [Validators.required]),
          data: new FormControl(null, [Validators.required]),
          Duration: new FormControl(null, [Validators.required]),
          discription: new FormControl(null, [Validators.required]),
          agree : new FormControl(null, [Validators.required]),
          Author: new FormArray([
            //this.one = new FormGroup({ }), //this commite to try use formGroup
            //this.two = new FormGroup({})
          ]) 
        })
    //*/

  }

  createCourse(data: NgForm) {
    const fb = new FormData();
    fb.append('image', this.fileSelected.name);
    const NewCOurst : Course = {
      title : data.value.Title,
      date : data.value.date,
      duration : data.value.duration,
      description : data.value.discription,
      authors : this.AutherSelected,
      isTopRated : data.value.agree,
      id : null,
      imageUrl : fb
    }
    this.service.createCourse(NewCOurst).subscribe(data => {
      console.log(data);
      this.router.navigate(['../'], {relativeTo: this.route });
    })
  }
  vaild: boolean;
  fileSelected : File;
  onFileSelect(event){
    this.fileSelected = <File>event.target.files[0];
  }

  OnSelectAuth(data: any, form: NgForm) {
    console.log(this.fileSelected);
    if (!this.AutherSelected.includes(data)) {
      this.AutherSelected.push(data);
    } else {
      this.AutherSelected.splice(this.AutherSelected.indexOf(data), 1);
    }

    form.statusChanges.subscribe(data => {
     if (data == 'VALID' && this.AutherSelected.length > 0) {
        this.vaild = true;
      } else {
        this.vaild = false;
      }
    });
  }
}
