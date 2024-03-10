import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../service/navigation.service';
import { TokenService } from '../service/token.service';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/Customer';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { GetrestaurantService } from '../service/getrestaurant.service';
import { Restaurant } from '../model/Restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnInit{
addRestaurant(event:Event) {
  event.preventDefault();
    this.router.navigateByUrl("/adminlogin");
}
addItems(event:Event) {
    event.preventDefault();
    this.router.navigateByUrl("/additem");
}

  currentCustomer:Customer={};
  currentRestaurant:Restaurant={};
  isRestaurantOwner:boolean=false;
  isCustomer:boolean=true;
  role?:string;
  constructor(private router:Router,private navigationService:NavigationService,private tokenService:TokenService,private customerService:CustomerService,public cartService:CartService,public authService:AuthService,private getRestaurantService:GetrestaurantService){
      this.role=this.getRole();
      if(this.role==="customer"){
      this.customerService.getCustomerDetails().subscribe(
        success=>{
          this.currentCustomer=success;
          console.log(this.currentCustomer);
        },
        failure=>{
          console.log(failure);
        }
      )}
      else if(this.role==="restaurant"){
        this.getRestaurantService.getRestaurant().subscribe(
          success=>{
            this.currentRestaurant=success;
          },
          failure=>{
            console.log(failure);
          }
        )
      }
  }

  ngOnInit(): void {
    this.customerService.getCustomerDetails().subscribe(
      success=>{
        this.currentCustomer=success;
        console.log(this.currentCustomer);
      },
      failure=>{
        console.log(failure);
      }
    )
  }
  list:string[]=[
    "a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"
  ];
  login(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("/homelogin");
  }
  signup(event:Event){
    event.preventDefault();
    this.router.navigateByUrl("/signup");
  }
  gotoRestaurant(city:string){
    this.router.navigateByUrl("/restaurantview/"+city);
  }
  isGuest():boolean{
    if(this.currentCustomer.username){
      return false;
    }
    else{
      return true;
    }
  }
  logout(){
    this.currentCustomer={};
    this.tokenService.storeToken("customer","");
  }
  getOrders(){
    this.router.navigateByUrl("/orderview");
  }
  getCart(){
    this.router.navigateByUrl("/cartview");
  }
  getRole(){
    console.log(this.authService.getRole());
    return this.authService.role;
  }
  goToRestaurantOrderView(event:Event) {
      event.preventDefault();
      this.router.navigateByUrl("/restaurantorderview");
    }
}
