import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import { PlaceHolderDirective } from 'src/app/core/service/place-holder.directive';
import { AuthService } from '../../AUTH/Service/auth.service';
import { Classes } from '../services/Classes.model';
import { CourseService } from '../services/course.service';
import { Store } from '@ngrx/store';
import * as ClassAction from './store/class-list.Actions';
import { Subscription } from 'rxjs';
import { Error } from './store/class-list.reducer';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit , OnDestroy, AfterViewInit {
Admin : boolean = false;

classes : Classes[] = [] //[{name: 'class1'}, {name: 'class2'}, {name: 'class3'}, {name: 'class4'}];
Materials=[{name: 'Material1'}, {name: 'Material2'}, {name: 'Material3'}, {name: 'Material4'},
                        {name: 'Material5'}, {name: 'Material6'}, {name: 'Material7'}, {name: 'Material8'}];

@ViewChild('createNewClasse') createNewClasse : NgForm;
@ViewChild(PlaceHolderDirective , {static : false}) alertHost!: PlaceHolderDirective;

  constructor(
    private Authservice : AuthService, private ClassService : CourseService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store : Store<{ClassesList : Array<Classes>, ErrorMessage: Error}>,
    private cdref: ChangeDetectorRef
    ) { }
    NewClase: Classes;
    subscribe : Subscription;
  ngOnInit(): void {   
    this.Authservice.UserRegistery.subscribe((data : any) => {
      if(data){
        this.Admin =  data.type == 1 ? true: false;
      }      
    });
  }
  ngAfterViewInit() {
    this.store.dispatch(new ClassAction.RequestGetClasses());
    // this.subscribe = this.store.select('ClassesList').subscribe((data : Classes[]) => {
    //   if(data[0] != undefined){
    //     this.classes = data;
    //     //console.log(data)
    //   }      
    // })
    this.subscribe = this.store.select('ErrorMessage').subscribe((data : any) => {
      //console.log(data)
      if(data.error){
        //console.log(data)
        this.ShowErrorMesage(data); 
      }
    })
  }
  old: any;
  new : any;

  Action(event: any){
    if(!this.old){
      this.old = $(`#${event.srcElement.id}`);
    }else{
      this.new = $(`#${event.srcElement.id}`);
      if(this.old !== this.new){
        this.old.attr("aria-selected", false);
        this.old.removeClass("active");
        this.old = $(`#${event.srcElement.id}`);
      }      
    }
  }
  NewCourse(Form : NgForm){
    let Material = [];
    for (let key in Form.form.value) {
      Form.form.value[key] === true ? Material.push(key) : null ;
  }
    this.NewClase = {Name : Form.form.value.name, Detials : Form.form.value.detials, Note: Form.form.value.note, Material: Material};
    // this.ClassService.AddNewClass(this.NewClase).subscribe((result : any) => {
    //   console.log(result);
    // }, error => {
    //   //console.log(error);
    //   this.ShowErrorMesage(error);
    // })
  this.store.dispatch(new ClassAction.AddNewClass(this.NewClase));
  }

  ShowErrorMesage(error) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorComponent);
    const hostViewContainerRef = this.alertHost.viewError;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
    componentRef.instance.StatusCode = error.status;
    componentRef.instance.Error = error.error.message;
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    this.store.dispatch(ClassAction.DestoryError());
  }
}
