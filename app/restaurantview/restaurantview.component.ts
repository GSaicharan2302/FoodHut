import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../model/Restaurant';
import { RestaurantService } from '../services/restaurant.service';

import { NavigationService } from '../service/navigation.service';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/Customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetrestaurantService } from '../service/getrestaurant.service';
import { ImageService } from '../service/image.service';

@Component({
  selector: 'app-restaurantview',
  templateUrl: './restaurantview.component.html',
  styleUrls: ['./restaurantview.component.css']
})
export class RestaurantviewComponent {
    city?:string;
    name:string="";
    hide:boolean=false;
    ratingDisplay:boolean=false;
    favDisplay:boolean=false;
    categoryDisplay:boolean=false;
    priceDisplay:boolean=false;
    restaurants:Restaurant[]=[];
    tempRestaurants:Restaurant[]=[];
    currentCustomer:Customer={};
    imageUrlMap:any=new Map<string,string>();
    constructor(private activatedRoute:ActivatedRoute,private restaurantService:RestaurantService,private navigationService:NavigationService,private customerService:CustomerService,private snackBar:MatSnackBar,private getRestaurantService:GetrestaurantService,private router:Router,private imageService:ImageService){
      this.activatedRoute.paramMap.subscribe(data=>{
        this.city=data.get('city')??"";
        localStorage.setItem("city",this.city);
        this.navigationService.currentCity=this.city;
        this.getRestaurants();
      })
      this.navigationService.fromHome=false;
      this.navigationService.fromRestaurant=true;
      this.customerService.getCustomerDetails().subscribe(
        success=>{
          this.currentCustomer=success;
        },
        failure=>{
          console.log(failure);
        }
      )
    }
  
    toggleColor(id:string|undefined){
      this.hide=!this.hide;
      if(!this.checkFavourites(id)){
      if(id){
      this.currentCustomer.favourites?.push(id);
      this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
        success=>{
          this.currentCustomer=success;
          this.snackBar.open("Added to Favourites","Success",{
            duration:2000
          })
        }
      );
      
    }
      
    }
    else{
      if(id){
      this.currentCustomer.favourites=this.currentCustomer.favourites?.filter(e=>e!==id);
      this.customerService.updateCustomerDetails(this.currentCustomer);
      }
    }
  }
    checkFavourites(id:string|undefined){
      if(id){
        if(this.currentCustomer.favourites?.includes(id)){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    getRestaurants(){
      this.favDisplay=false;
      this.ratingDisplay=false;
      this.categoryDisplay=false;
      this.priceDisplay=false;
      if(this.city){
      this.restaurantService.getRestaurantsByCity(this.city).subscribe(
          success=>{
            this.restaurants=success;
            console.log(this.restaurants);
            this.restaurants.forEach(e=>{
              this.downloadImage(e.imageID);
            })
          },
          failure=>{
            console.log(failure);
          }
      )}
    }
    sortByPrice(){
      this.priceDisplay=true;
      this.restaurants=this.restaurants.filter(e=>{
        if(e.price && e.price>=300 && e.price<=600){
          return e;
        }
        else{
          return;
        }
      })
    }
    downloadImage(id:string|undefined){
      if(id){
        this.imageService.downloadAssociatedImage(id).subscribe(
          success=>{
              this.imageUrlMap.set(id,success);
          },
          failure=>{
              console.log(failure);
          }
        )
      }
    }
    getImageUrl(id:string|undefined){
        if(id){
          return this.imageUrlMap.get(id);
        }
    }
    sortByRating(){
      this.ratingDisplay=true;
      this.restaurants=this.restaurants.filter(e=>{
        if(e.rating){
          return e.rating>=4;
        }
        else{
          return;
        }
      });
    }
    getRestaurantByName(){
      // this.restaurants=this.restaurants.filter(e=>e.restaurantname?.toLowerCase()===this.name.toLowerCase())
      if(this.name!=""){
        this.tempRestaurants=this.restaurants.filter(e=>e.restaurantname?.toLowerCase().startsWith(this.name.toLowerCase()));
        if(this.tempRestaurants.length>0){
          this.restaurants=this.tempRestaurants;
        }
        else{
          this.getRestaurants();
        }
      }
      else{
        this.getRestaurants();
      }
    }
    getFavourites(){
      this.favDisplay=true;
      this.restaurants=[];
      this.currentCustomer.favourites?.forEach(e=>{
        this.getRestaurantService.getRestaurantById(e).subscribe(
          success=>{
              console.log(success);
            if(success.location?.city?.toLowerCase()===this.city?.toLowerCase())
            this.restaurants.push(success);
          }
        )
      })
    }

logout(){
  localStorage.setItem("customer","");
  this.currentCustomer={}
  // this.router.navigateByUrl("/home");  
}
cardClick(id:string|undefined){
  if(id){
    id=id.replace(/ /g,"-");
  console.log(id);
  this.router.navigateByUrl("/productview/"+this.city+"/"+id);
}
}
goToHome(){
  this.router.navigateByUrl("/home");
}   
viewProfile(){
  this.router.navigateByUrl("/profile");
}
getRestuarantByCategory(category:string){
  this.categoryDisplay=true;
  this.restaurants=this.restaurants.filter(e=>e.category?.map(i=>i.toLowerCase()).includes(category.toLowerCase()))
}
}
