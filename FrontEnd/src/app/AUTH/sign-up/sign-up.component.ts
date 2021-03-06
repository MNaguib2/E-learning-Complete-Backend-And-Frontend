import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlaceHolderDirective } from '../../core/service/place-holder.directive';
import { ErrorComponent } from '../../core/components/error/error.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HostServer } from '../../core/service/MainDataShare';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  imageAvatar = 'assets/Avatar/male.png';
  Image!: File;
  Gender: string = 'Male';
  message = '';
  Status = '';
  BasicUrl = this.Route.snapshot.url[0].path;
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost!: PlaceHolderDirective;
  constructor(private service: AuthService,
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver,
    private Route: ActivatedRoute,
    private Router: Router
  ) { }

  ngOnInit(): void {
    //console.log(this.Route.params)
    // this.message = 'Done! Please Check Your Mail!'
    //console.log(this.Route.snapshot.url[0].path === 'confirm')
    this.Route.params.subscribe(data => {
      if (this.BasicUrl === 'confirm') {
        this.service.getConfirmActivation(data.Token, data.Id).subscribe((ReciveData: any) => {
          //console.log(ReciveData);
          this.Status = ReciveData.body.Status;
          this.message = ReciveData.body.Message;
        }, (err) => {
          console.log(err);
          this.ShowErrorMesage(err);
        })
      }
    })
  }

  changeGender(event: Event) {
    //console.log((event.srcElement as HTMLTextAreaElement).id);
    const select = (event.srcElement as HTMLTextAreaElement).id;
    if (select === 'Male') {
      this.imageAvatar = 'assets/Avatar/male.png';
      this.Image = undefined;
      this.Gender = 'Male';
    } else {
      this.imageAvatar = 'assets/Avatar/Female.png';
      this.Image = undefined;
      this.Gender = 'FeMale';
    }
  }
  mouseentreInAvater(event: Event) {
    const selectImage = document.getElementsByClassName('selectImage');
    selectImage[0].setAttribute('style', 'display : block;');
    (event.target as HTMLInputElement).setAttribute('style', 'cursor: pointer;');
  }
  mouseLeaveInAvater(event: Event) {
    const selectImage = document.getElementsByClassName('selectImage');
    selectImage[0].setAttribute('style', 'display : none;');
  }
  getImage(event: Event) {
    if ((<HTMLInputElement>event.target).files.length > 0) {
      const file = (<HTMLInputElement>event.target).files[0];
      this.Image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageAvatar = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  SubmitSignUp(SignUpForm: NgForm) {
    const formData = new FormData;
    formData.append('FirstName', SignUpForm.form.value.firstname);
    formData.append('LastName', SignUpForm.form.value.lastname);
    formData.append('email', SignUpForm.form.value.Email);
    formData.append('pasword', SignUpForm.form.value.Password);
    formData.append('confirmPassword', SignUpForm.form.value.confirmpassword);
    formData.append('Date', SignUpForm.form.value.date);
    formData.append('Gender', this.Gender);
    let replay = false;
    this.service.PostSignUp(formData).pipe(
      tap((response: any) => {
        console.log(response);
        if (this.Image) {
          console.log('error');
          const ImageData = new FormData;
          ImageData.append('ImageProfile', this.Image, this.Image.name);
          ImageData.append('FileName', 'Test');
          this.http.post(HostServer + `Admin/postImage/${response.body.Id}`, ImageData).subscribe(UploadImage => {
            console.log('error');
            console.log(UploadImage);
          });
        }
      })
    )
      .subscribe((data: any) => {
        //console.log(data);
        this.Status = data.body.Status;
        this.message = data.body.Message;
        replay = true;
      }, (error) => {
        // console.log(error);
        this.ShowErrorMesage(error);
      });

    // formData.forEach((value,key) => {
    //   console.log(key+" "+value)
    // });
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
