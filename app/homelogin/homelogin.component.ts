import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkEmail } from './customValidator';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homelogin',
  templateUrl: './homelogin.component.html',
  styleUrls: ['./homelogin.component.css']
})
export class HomeloginComponent {
signUp(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/signup");
}
    otp?:string;
    receivedOTP?:number;
    resendOTP:boolean=false;
    otpSection:boolean=false;
    constructor(private router:Router,private userService:UserService,private snackBar:MatSnackBar){
      
    }
    loginForm=new FormGroup({
      emailId:new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/),checkEmail()])
    })
   get emailId(){
      return this.loginForm.get('emailId');
    }
    goToHome(){
      this.router.navigateByUrl("/");
    }
    getOTP(){
      console.log(this.loginForm.value);
      this.userService.customerAuthLogin(this.loginForm.value).subscribe(
        success=>{
          console.log(success);
          this.otpSection=true;
          this.receivedOTP=success.OTP;
        },
        failure=>{
          console.log(failure);
        }
      )
    }
    checkOTP(){
      if(this.otp){
          this.userService.checkOTP(parseInt(this.otp),this.loginForm.value).subscribe(
            success=>{
              localStorage.setItem("customer",success.key?success.key:"");
              this.snackBar.open("Logged In","Success",{
                duration:2000,
                panelClass:["mat-toolbar","mat-primary"]
              });
              this.router.navigateByUrl("/home");
            },
            failure=>{
              console.log(failure);
              this.snackBar.open("Login Failed","Failure",{
                duration:2000,
                panelClass:["mat-toolbar","mat-warn"]
              });
              this.resendOTP=true;
            }
          )
      }
}
}