import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../model/Address';
import { cities, states } from '../model/AddressList';
import { Registration } from '../model/Registration';
import { PopupService } from '../service/popup.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private popup:PopupService,
    private router:Router
  ){}


  ngOnInit(): void {
    
  }
  _states = Object.values(states);
  _cities:string[] = [];
  showPassword: boolean = false;  

  
  registerForm:FormGroup = this.fb.group({
    username:[''],
    email:[''],
    contactno:[''],
    password:[''],
    confirmPassword:['']
  })
  addressForm:FormGroup = this.fb.group(
    {
      state:[],
      city:[],
      street:[''],
      area:[''],
      doorNo:[''],
      zipcode:['']
    }
  )
  get username(){
    return this.registerForm.get('username');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get contactno(){
    return this.registerForm.get('contactno');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }

  get state(){
    return this.addressForm.get('state');
  }
  get city(){
    return this.addressForm.get('city');
  }
  get street(){
    return this.addressForm.get('street');
  }
  get area(){
    return this.addressForm.get('area');
  }
  get doorNo(){ 
    return this.addressForm.get('doorNo');
  }
  get zipcode(){
    return this.addressForm.get('zipcode');
  }





  

  signup(){
    console.log('register');
    // console.log(this.addressForm.value);

    const newAddress:Address ={
      city: this.city?.value,
      area: this.area?.value,
      doorNo: this.doorNo?.value,
      state: this.state?.value,
      street: this.street?.value,
      zipcode: this.zipcode?.value
    }

    const registration:Registration = {
      username: this.username?.value,
      emailId: this.email?.value,
      contactNo: this.contactno?.value,
      password: this.password?.value,
      address: newAddress ,
    }

    // console.log(registration);

    this.userService.customerRegister(registration).subscribe(
      res=>{
        console.log(res);
        this.popup.openSnackBar("Successfully Registered");
        this.router.navigateByUrl("/homelogin");
      },
      err=>{
        this.popup.openSnackBar("registration failed")
      }
    )
    
    
  }

  cancel(){
    console.log('cancel');
  }

  stateChange(event: any){
    const selectedState = event.value;
    this._cities = cities[selectedState]  || [] ;
    this.addressForm.get('city')?.reset();

  }


}
