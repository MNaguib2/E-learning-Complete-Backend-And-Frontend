import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-detials',
  templateUrl: './detials.component.html',
  styleUrls: ['./detials.component.scss']
})
export class DetialsComponent implements OnInit, OnDestroy {

  constructor(private router : ActivatedRoute, private serveice : CourseService) { }
getCourseById : Subscription;
DataCourse;
ImageUrl;
Title;
  ngOnInit(): void {
    const id = this.router.snapshot.queryParams.id;
    this.getCourseById =  this.serveice.getCoursesByid(id).subscribe(data => {
      this.DataCourse = data;
      this.ImageUrl = data[0].imageUrl;
      this.Title = data[0].title;
      //console.log(data);
    })
  }

  ngOnDestroy() {
    this.getCourseById.unsubscribe();
  }

}
