import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { HttpClient } from '@angular/common/http';
import { PlaceHolderDirective } from '../../core/service/place-holder.directive';
import { ErrorComponent } from '../../core/components/error/error.component';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  imageAvatar = 'assets/Avatar/male.png';
  Image!:File; 
  Gender : string = 'Male';
  message ='';
  @ViewChild(PlaceHolderDirective, { static: false }) alertHost!: PlaceHolderDirective;
  constructor(private service : AuthService , 
    private http : HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  changeGender(event: Event){
    //console.log((event.srcElement as HTMLTextAreaElement).id);
    const select = (event.srcElement as HTMLTextAreaElement).id;
    if(select === 'Male'){
      this.imageAvatar = 'assets/Avatar/male.png';
      this.Image = undefined;
      this.Gender = 'Male';
        }else{
      this.imageAvatar = 'assets/Avatar/Female.png';
      this.Image = undefined;
      this.Gender = 'FeMale';
    }
  }
  mouseentreInAvater(event: Event){
    const selectImage = document.getElementsByClassName('selectImage');
    selectImage[0].setAttribute('style','display : block;');
    (event.target as HTMLInputElement).setAttribute('style','cursor: pointer;');
  }
  mouseLeaveInAvater(event: Event) {
    const selectImage = document.getElementsByClassName('selectImage');
    selectImage[0].setAttribute('style','display : none;');
  }
  getImage(event: Event){
    if((<HTMLInputElement>event.target).files.length > 0){
      const file = (<HTMLInputElement>event.target).files[0];
      this.Image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageAvatar = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
  URLTest = 'http://localhost:3000/feed/test';
  RealURL ='http://localhost:3000/Admin/SigUp';
SubmitSignUp(SignUpForm : NgForm){
    const formData = new FormData;
    if(this.Image){
      formData.append('Image' , this.Image, this.Image.name);
    }
    formData.append('FirstName',  SignUpForm.form.value.firstname);
    formData.append('LastName',  SignUpForm.form.value.lastname);
    formData.append('email', SignUpForm.form.value.Email);  
    formData.append('pasword', SignUpForm.form.value.Password);
    formData.append('confirmPassword', SignUpForm.form.value.confirmpassword);
    formData.append('Date', SignUpForm.form.value.date);
    formData.append('Gender', this.Gender);
    this.service.PostSignUp(formData).subscribe((data : any) => {
      console.log(data);
      this.message = data.body.Message;
    },(error) => {
      this.ShowErrorMesage(error);
    });

    // formData.forEach((value,key) => {
    //   console.log(key+" "+value)
    // });
  }
  ShowErrorMesage(error){
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
