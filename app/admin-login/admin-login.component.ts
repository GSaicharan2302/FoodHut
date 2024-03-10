import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
toggleHide(event:Event) {
  event.preventDefault();
this.hide=!this.hide;
}
  hide:boolean=true;
adminLogin=new FormGroup({
  emailId:new FormControl('',[Validators.required,Validators.pattern(/^[^\d][\w.-]+@(gmail|yahoo)\.com$/)]),
  password:new FormControl('',[Validators.required])
});
get emailId(){
  return this.adminLogin.get('emailId');
}
get password(){
  return this.adminLogin.get('password');
}
constructor(private adminService:AdminService,private snackBar:MatSnackBar,private router:Router){}
loginSubmit(){
  console.log(this.adminLogin.value);
  this.adminService.adminCheck(this.adminLogin.value).subscribe(
    success=>{
        this.snackBar.open("Admin logged in successful!!","success",{
          panelClass:["mat-toolbar","mat-primary"],
          duration:2000
        });
        this.router.navigateByUrl("/register-restaurant");
    },
    failure=>{
      console.log(failure);
      this.snackBar.open("Admin Login Failure","Failure",{
        panelClass:["mat-toolbar","mat-warn"],
        duration:2000
      })
    }
  )

}
}
