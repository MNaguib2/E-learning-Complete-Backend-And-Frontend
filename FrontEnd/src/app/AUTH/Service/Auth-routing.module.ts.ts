import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPasswordComponent } from "../forget-password/forget-password.component";
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";


const routes : Routes = [
    { path: '', component: LoginComponent},
    { path: 'signup' , component: SignUpComponent},
    { path: 'confirm/:Token/:Id' , component: SignUpComponent},
    { path: 'ForgetPassword' , component: ForgetPasswordComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRouting {}