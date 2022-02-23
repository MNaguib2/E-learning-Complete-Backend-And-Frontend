import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
Admin = true;
classes=['class1', 'class2', 'class3', 'class4'];
Materials=['Material1', 'Material2', 'Material3', 'Material4'];
  constructor() { }

  ngOnInit(): void {
  }
}
