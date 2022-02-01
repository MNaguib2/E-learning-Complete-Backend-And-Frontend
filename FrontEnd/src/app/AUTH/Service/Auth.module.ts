import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "src/app/AUTH/Service/AuthGuard.service";
import { PlaceHolderDirective } from "src/app/core/service/place-holder.directive";
import { LoginComponent } from "../login/login.component";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { AuthRouting } from "./Auth-routing.module.ts";
import { LoginGuard } from "./Login-Guard.service";

@NgModule({
    declarations: [
        SignUpComponent,
        LoginComponent,
        PlaceHolderDirective
    ],
    // exports: [
    //     // SignUpComponent,
    //     // LoginComponent,
    //     //PlaceHolderDirective
    //   ],
    imports:[
        CommonModule, //to Use Directive ngIf and ngFor etc..
        FormsModule, // ti Use NgModule
        AuthRouting
    ],
    providers:[
        AuthGuard,
        LoginGuard
    ]
})

export class AuthModule { }