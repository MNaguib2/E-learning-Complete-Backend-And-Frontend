import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Classes, Material, Proffersor } from '../services/Classes.model';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent implements OnInit, OnDestroy {
@Input() Classes : Array<Classes>;
@Input() Material : Array<Material>;
Professors : Proffersor[] = [];
public filteredList2 = this.Professors.slice();
  constructor(    
    private store : Store<{Professor : Array<Proffersor>}>) {
    this.CreateMaterial = new FormGroup({});
   }
  CreateMaterial: FormGroup;
  subscribeAdd : Subscription;

  ngOnInit(): void {   
    this.subscribeAdd = this.store.select('Professor').subscribe((data : Proffersor[]) => {
      console.log(data);
      if(data[0]._id!= ""){
        this.Professors = data;
      }
    }) ; 
  }

  CreateNewMaterial(){

  }
  ngOnDestroy(): void {
    this.subscribeAdd.unsubscribe();
  }

}
