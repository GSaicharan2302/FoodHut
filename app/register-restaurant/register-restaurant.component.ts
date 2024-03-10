import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../model/Address';
import { cities, states } from '../model/AddressList';
import { Restaurant } from '../model/Restaurant';
import { PopupService } from '../service/popup.service';
import { RestaurantService } from '../service/restaurant.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent {

  constructor(
    private fb:FormBuilder,
    private restaurantService:RestaurantService,
    private  tokenService:TokenService,
    private  popupService:PopupService

  ){}

  _states = Object.values(states);
  _cities:string[] = [];
  showPassword: boolean = false;  

  restaurantInfo:FormGroup = this.fb.group(
    {
      restaurantName:[''],
      contactNumber:[''],
      emailId:[''],
      password:[''],
      confirmPassword:['']
    }
  )

  get restaurantName(){
    return this.restaurantInfo.get("restaurantName");
  }
  get contactNumber(){
    return this.restaurantInfo.get("contactNumber");
  }
  
  get emailId(){
    return this.restaurantInfo.get("emailId");
  }
  get password(){
    return this.restaurantInfo.get("password");
  }
  get confirmPassword(){
    return this.restaurantInfo.get("confirmPassword");
  }

  


  location:FormGroup = this.fb.group(
    {
      doorNo:[''],
      street:[''],
      area:[''],
      city:[''],
      state:['']
    }
  )
  get doorNo(){
    return this.location.get("doorNo");
  }
  get street(){
    return this.location.get("street");
  }
  get area(){
    return this.location.get("area");
  }
  get city(){
    return this.location.get("city");
  }
  get state(){
    return this.location.get("state");
  }

  extraInfo:FormGroup = this.fb.group(
    {
      description:[''],
      cuisineType:['']
    }
  )

  get description(){
    return this.extraInfo.get("description");
  }
  get cuisineType(){
    return this.extraInfo.get("cuisineType");
  }

  stateChange(event: any){
    const selectedState = event.value;
    this._cities = cities[selectedState]  || [] ;
    this.location.get('city')?.reset();

  }



  register(){

    // console.log(this.restaurantInfo.value);
    // console.log(this.location.value);
    // console.log(this.extraInfo.value);
    
    // const token:string | null =  this.tokenService.getToken("restaurant");
    const newLocation:Address = {
      area: this.area?.value,
      city: this.city?.value,
      doorNo: this.doorNo?.value,
      street: this.street?.value,
      state: this.state?.value

    }
    
    
    const newRestaurant:Restaurant = {
      // restaurantName: this.restaurantName?.value,
      emailId: this.emailId?.value,
      contactNumber: this.contactNumber?.value,
      password: this.password?.value,
      location: newLocation,
      cuisineType: this.cuisineType?.value,
      description: this.description?.value
    }

    console.log(newRestaurant);
    
    this.restaurantService.registerRestaurant(newRestaurant).subscribe(
      res=>{
        this.popupService.openSnackBar("registration successfull");
      },
      err=>{
        this.popupService.openSnackBar("registration failed");
      }
    )
  }




}
