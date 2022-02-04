import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { data } from 'jquery';
import { ErrorComponent } from 'src/app/core/components/error/error.component';
import { PlaceHolderDirective } from 'src/app/core/service/place-holder.directive';
import { AuthService } from '../Service/auth.service'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost!: PlaceHolderDirective;
  message = '';
  status = '';
  FormNewPassword: FormGroup;
  constructor(private service : AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private Route: ActivatedRoute) { }

  ngOnInit(): void {
    this.FormNewPassword = new FormGroup({
      'Username' : new FormControl(null,[Validators.required]),
      'Password' : new FormControl(null,[Validators.required , Validators.minLength(8)]),
      'ConfirmPassword' : new FormControl(null,[Validators.required, Validators.minLength(8)]),
    },{ validators: this.checkPasswords })
  }
  BasicUrl = this.Route.snapshot.url[0].path;  
  Url : string = this.Route.snapshot.url[1].path;
  Restpassword(RestPassword : NgForm){
    this.service.getRestPass(RestPassword.value.email).subscribe((data : any) => {
      //console.log(data);
      this.message = data.body.Message;
      this.status = data.body.Status;
    },(error) => {
      //console.log(error);
      this.ShowErrorMesage(error);
    })
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
  ResetPassword(){
    //console.log(this.FormNewPassword);
    this.service.postNewPassword(this.FormNewPassword.value.Username,
      this.FormNewPassword.value.Password,this.FormNewPassword.value.ConfirmPassword,
      this.Url).subscribe((data:any) => {
        console.log(data);
      },(error) => {
        console.log(error);
        this.ShowErrorMesage(error);
      })
  }
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('Password').value;
    let confirmPass = group.get('ConfirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }
}
