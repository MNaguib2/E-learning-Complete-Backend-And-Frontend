import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  constructor(private service : AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,) { }

  ngOnInit(): void {
  }

  Restpassword(RestPassword : NgForm){
    this.service.getRestPass(RestPassword.value.email).subscribe((data : any) => {
      console.log(data);
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
}
