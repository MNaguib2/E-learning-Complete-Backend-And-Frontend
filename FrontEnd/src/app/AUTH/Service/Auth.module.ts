import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "src/app/AUTH/Service/AuthGuard.service";
import { PlaceHolderDirective } from "src/app/core/service/place-holder.directive";
import { ForgetPasswordComponent } from "../forget-password/forget-password.component";
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { AuthRouting } from "./Auth-routing.module.ts";
import { LoginGuard } from "./Login-Guard.service";

@NgModule({
    declarations: [
        SignUpComponent,
        LoginComponent,
        ForgetPasswordComponent,
        PlaceHolderDirective
    ],
    // exports: [
    //     // SignUpComponent,
    //     // LoginComponent,
    //     //PlaceHolderDirective
    //   ],
    imports: [
        CommonModule, //to Use Directive ngIf and ngFor etc..
        FormsModule, // it Use NgModule
        AuthRouting,
        ReactiveFormsModule
    ],
    providers: [
        AuthGuard,
        LoginGuard,
    ]
})

export class AuthModule { }