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
  old: any;
  new : any;
  Action(event: any){
    if(!this.old){
      this.old = $(`#${event.explicitOriginalTarget.id}`);
    }else{
      this.old.attr("aria-selected", false);
      this.old.removeClass("active");
      this.old = $(`#${event.explicitOriginalTarget.id}`);
    }
  }
}
