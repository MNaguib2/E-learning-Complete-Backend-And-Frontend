import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Classes } from '../services/Classes.model';
import * as ClassAction from '../classes/store/class-list.Actions';


@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.scss']
})
export class AddClassesComponent implements OnInit {
  @ViewChild('createNewClasse') createNewClasse: NgForm;
  NewClase : Classes;
  constructor(
    private store : Store<{ClassesList : Array<Classes>}>
  ) { }

  Materials=[{name: 'Material1'}, {name: 'Material2'}, {name: 'Material3'}, {name: 'Material4'},
                        {name: 'Material5'}, {name: 'Material6'}, {name: 'Material7'}, {name: 'Material8'}];

  ngOnInit(): void {
  }
  NewCourse(Form: NgForm) {
    let Material = [];
    for (let key in Form.form.value) {
      Form.form.value[key] === true ? Material.push(key) : null;
    }
    this.NewClase = { Name: Form.form.value.name, Detials: Form.form.value.detials, Note: Form.form.value.note, Material: Material, _id: null };
    // this.ClassService.AddNewClass(this.NewClase).subscribe((result : any) => { // this comment to work in NGRX
    //   console.log(result);
    // }, error => {
    //   //console.log(error);
    //   this.ShowErrorMesage(error);
    // })
    this.store.dispatch(new ClassAction.RequestAddNewClass(this.NewClase));
    this.createNewClasse.resetForm();
  }

}
