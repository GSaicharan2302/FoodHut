import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopupService } from '../service/popup.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-restaurant-login',
  templateUrl: './restaurant-login.component.html',
  styleUrls: ['./restaurant-login.component.css']
})
export class RestaurantLoginComponent {


  constructor(
    private fb:FormBuilder,
    private popup:PopupService,
    private tokenService:TokenService
  ){}

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
  login(){}




}
