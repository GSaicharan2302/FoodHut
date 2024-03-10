import { Component } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { GetrestaurantService } from '../service/getrestaurant.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { ImageService } from '../service/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurantorderview',
  templateUrl: './restaurantorderview.component.html',
  styleUrls: ['./restaurantorderview.component.css']
})
export class RestaurantorderviewComponent {
openOrders() {
  this.restaurant.status="active";
  this.isOpenOrdersBtn=false;
  this.getRestaurantService.updateRestaurant(this.restaurant).subscribe(
    success=>{
      console.log(success);

    },
    failure=>{
      console.log(failure);
    }
  )
}
closeOrders() {
    this.restaurant.status="inactive";
    this.isOpenOrdersBtn=true;
    this.getRestaurantService.updateRestaurant(this.restaurant).subscribe(
      success=>{
        console.log(success);

      },
      failure=>{
        console.log(failure);
      }
    )
}
isGuest() {
throw new Error('Method not implemented.');
}
logout() {
  this.tokenService.storeToken("customer","");
  this.goToHome();
}
login() {
throw new Error('Method not implemented.');
}
viewProfile() {
throw new Error('Method not implemented.');
}
goToHome(){
  this.router.navigateByUrl("home");
}
  restaurant:Restaurant={};
  imageURL?:string;
  isCloseOrdersBtn?:boolean;
  isOpenOrdersBtn?:boolean;
  deliveredMap=new Map<String,Boolean>();
  constructor(private getRestaurantService:GetrestaurantService,private tokenService:TokenService,private router:Router,private imageService:ImageService,private snackBar:MatSnackBar){
    this.getRestaurantService.getRestaurant().subscribe(
      success=>{
          this.restaurant=success;
          console.log(this.restaurant);
          console.log(this.restaurant.orderList);
          this.restaurant.orderList?.forEach(e=>{
            if(e.status && e.status==="nodelivered"){
              if(e.orderID)
              this.deliveredMap.set(e.orderID,false);
            }
            else if(e.status && e.status==="delivered"){
              if(e.orderID)
              this.deliveredMap.set(e.orderID,true);
            }
          });
          if(this.restaurant.status==="active"){
            this.isOpenOrdersBtn=false;
          }
          else{
            this.isOpenOrdersBtn=true;
          }
      },
      failure=>{
        console.log(failure);
      }
    )
    // if(this.restaurant.status==="active"){
    //   this.isOpenOrdersBtn=false;
    // }
    // else{
    //   this.isOpenOrdersBtn=true;
    // }
  }
  downloadImage(id:string|undefined):string{
    if(id){
    this.imageService.downloadAssociatedImage(id).subscribe(
      success=>{
          return success;
      },
      failure=>{
          console.log(failure);
          // return "";
      }
  )
  }
  return "";
  }
  getDeliveredStatus(id:string|undefined){
    if(id){
      return this.deliveredMap.get(id);
    }
    return;
  }

}
