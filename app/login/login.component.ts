import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Login } from '../model/Login';
import { LoginResponse } from '../model/LoginResponse';
import { PopupService } from '../service/popup.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { Item } from '../model/Item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cart:Item[]=[];
  constructor(
    private userService:UserService,
    private fb:FormBuilder,
    private popup:PopupService,
    private tokenService:TokenService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private navigationService:NavigationService
  ){
    const urlSegments = this.activatedRoute.snapshot.url;

    // Convert the URL segments to a string
    const url = urlSegments.map(segment => segment.path).join('/');

    console.log('Request came from URL:', url);
  }

  loginForm:FormGroup=this.fb.group(
    {
      emailId:[''],
      password:['']
    }
  )

  showPassword:boolean = false;
  
  get emailId(){
    return this.loginForm.get('emailId');
  }
  get password(){
    return this.loginForm.get('password');
  }


  
  login(){
    console.log("login func");
    // console.log(this.loginForm.value);
    const login:Login = {...this.loginForm.value};
    // console.log(login);
    
    
    this.userService.customerAuthLogin(login).subscribe(
      res=>{
        console.log("jwt:");
        const loginResponse:LoginResponse = res; 
        console.log(loginResponse);
        const token = loginResponse.key;
        console.log(token);
        if(token){
          this.tokenService.storeToken("customer",token);
          this.tokenService.storeToken("cart",JSON.stringify(this.cart))
          this.router.navigateByUrl("/home");
        }else{
          this.popup.openSnackBar("login not saved")
        }

        
        this.popup.openSnackBar("logged in", "success!")
      },
      err=>{
        console.log(err);
        this.popup.openSnackBar("login failed, email or password incorrect","try again")
        this.loginForm.reset()
        
      }
    )

  }
  cancel(){}
  
}
