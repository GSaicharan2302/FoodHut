import { Component } from '@angular/core';
import { Item } from '../model/Item';
import { Order } from '../model/Order';
import { RestaurantProduct } from '../model/RestaurantProduct';
import { Restaurant } from '../model/Restaurant';
import { Customer } from '../model/Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { NavigationService } from '../service/navigation.service';
import { CustomerService } from '../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetrestaurantService } from '../service/getrestaurant.service';
import { TokenService } from '../service/token.service';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import {format,parseISO} from 'date-fns'
import { ImageService } from '../service/image.service';
@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.css']
})
export class OrderviewComponent {
  badgeHidden:boolean=false;
  cartSize:number=0;
  tempItem:Item={};
  item:Item={};
  itemList:Item[]|undefined;
  orderList:Order[]|undefined=[];
  order:Order={};
  tempProducts:RestaurantProduct[] | undefined=[];
  temp:RestaurantProduct|undefined={};
  favorites:boolean=false;
  sortRating?:boolean=false;
  wholeRating?:number;
  sideRating?:number;
  name:string="";
  num:number=5;
  hide:boolean=false;
  favDisplay:boolean=false;
  products:RestaurantProduct[]|undefined=[];
  restaurant:Restaurant={};
  currentRestaurant:Restaurant={};
  restaurants:Restaurant[]=[];
  tempRestaurants:Restaurant[]=[];
  currentCustomer:Customer={};
  isDelivered?:boolean;
  deliveredMap=new Map<String,Boolean>();
  orderRestaurantMap=new Map<string,string>();
  restaurantHolderMap=new Map<string,Restaurant>();
  orderImageMap=new Map<string,string>();
  constructor(private activatedRoute:ActivatedRoute,private restaurantService:RestaurantService,private navigationService:NavigationService,private customerService:CustomerService,private snackBar:MatSnackBar,private getRestaurantService:GetrestaurantService,private tokenService:TokenService,private router:Router,public cartService:CartService,private orderService:OrderService,private imageService:ImageService){
    this.isDelivered=true;
    this.customerService.getCustomerDetails().subscribe(
      success=>{
        this.currentCustomer=success;
        console.log(this.currentCustomer);
        this.orderList=this.currentCustomer.orderList;
        this.orderList?.forEach(e=>{
          if(e.orderID && e.restaurant){
          this.orderRestaurantMap.set(e.orderID,e.restaurant);
          this.fetchRestaurantByOrderID(e.orderID);
        }
          if(e.status && e.status==="nodelivered"){
            if(e.orderID)
            this.deliveredMap.set(e.orderID,false);
          }
          else if(e.status && e.status==="delivered"){
            if(e.orderID)
            this.deliveredMap.set(e.orderID,true);
          }
        })
        // this.getRestaurantById();
      },
      failure=>{
        console.log(failure);
      }
    )
  }



fetchRestaurantByOrderID(id:string|undefined){
    if(id){
      let restaurantID=this.orderRestaurantMap.get(id);
      if(restaurantID)
      this.getRestaurantService.getRestaurantById(restaurantID).subscribe(
          success=>{
              this.restaurantHolderMap.set(id,success);
              this.downloadImage(id);
          },
          failure=>{
              console.log(failure);
              
              
          }
        )
    }
   
}
downloadImage(id:string|undefined){
  if(id){
    let restaurantID=this.restaurantHolderMap.get(id)?.imageID;
    if(restaurantID)
    this.imageService.downloadAssociatedImage(restaurantID).subscribe(
        success=>{
            this.orderImageMap.set(id,success);
        },
        failure=>{
            console.log(failure);
        }
    )
  }
}
getCurrentRestaurant():Restaurant{
  return this.currentRestaurant;
}
toggleColor(id:string|undefined){
  if(id){
      if(!this.checkFavourites(id)){
        this.currentCustomer.favouriteProducts?.push(id);
        this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
          success=>{
            this.currentCustomer=success;
            console.log(this.currentCustomer);
            this.snackBar.open('Added to favourites','success',{
              duration:2000,
              panelClass:['mat-toolbar','mat-primary']
            })
          },
          failure=>{
            this.snackBar.open('Cannot add to Favourites','Failure',{
              duration:2000,
              panelClass:['mat-toolbar','mat-warn']
            });
          }
        );
      }
      else{
        this.currentCustomer.favouriteProducts=this.currentCustomer.favouriteProducts?.filter(e=>e!==id);
        this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
          success=>{
            this.snackBar.open('Removed From Favourites','Success',{
              duration:2000,
              panelClass:['mat-toolbar','mat-warn']
            })
          },
          failure=>{
            console.log(failure);
          }
        )
      }
      
      
  }
  else{
    return ;
  }
}
getImageURL(id:string|undefined){
  if(id){
    return this.orderImageMap.get(id);
  }
  return;
}
updateOrder(id:string|undefined){
    if(id){
      this.orderService.updateOrder(id).subscribe(
        success=>{
            console.log(success);
            this.deliveredMap.set(id,true);
        },
        failure=>{
          console.log(failure);
          return false;
        }
      )
    }
}
getDeliveryStatus(id:string|undefined){
  if(id){
    return this.deliveredMap.get(id);
  }
  return;
}
  checkFavourites(id:string|undefined){
    if(id){
      if(this.currentCustomer.favouriteProducts?.includes(id)){
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
 
  sortByRating(){
    this.sortRating=true;
    this.products=this.products?.filter(e=>{
      if(e.rating){
        return e.rating>=4;
      }
      else{
        return e;
      }
    })
  }
  // getRestaurantByName(){
  //   this.restaurants=this.restaurants.filter(e=>e.restaurantname?.toLowerCase()===this.name.toLowerCase())
  //   if(this.name!=""){
  //     this.tempRestaurants=this.restaurants.filter(e=>e.restaurantname?.toLowerCase().startsWith(this.name.toLowerCase()));
  //     if(this.tempRestaurants.length>0){
  //       this.restaurants=this.tempRestaurants;
  //     }
  //     else{
  //       this.getRestaurants();
  //     }
  //   }
  //   else{
  //     this.getRestaurants();
  //   }
  // }
  getFavourites(){
    this.favorites=true;
    this.tempProducts=[];
    console.log(this.currentCustomer.favouriteProducts);
    this.currentCustomer.favouriteProducts?.forEach(e=>{
        this.temp=this.products?.filter(item=>item.productId===e)[0];
        if(this.temp){
          this.tempProducts?.push(this.temp);
        }
    })
    if(this.tempProducts){
      if(this.tempProducts.length>0){
        this.products=this.tempProducts;
      }
      else{

        this.getRestaurantByPathName();
      }
    }

  }
  getRestaurantByPathName(){
    this.sortRating=false;
    this.favorites=false;
    console.log(this.restaurant);
      this.products=this.restaurant.listofItems;
      console.log(this.products)
  }
  getRange(n:number|undefined){
    if(n)
    return new Array(n);
    else
    return;
  }
  getWholeRating(n:number|undefined){
    const temp=n?.toString();
    if(temp){
      const arr=temp.split(".");
    return parseInt(arr[0]);
    }
    return;
  }
  getSideRating(n:number|undefined){
    const temp=n?.toString();
    if(temp){
      const arr=temp.split(".");
      return parseInt(arr[1])===5?1:0;
    }
    return ;
  }
  logout(){
    this.tokenService.storeToken("customer","");  
    this.currentCustomer={}
    this.router.navigateByUrl("/home");  
  }
  goToRestaurants(){
    this.router.navigateByUrl("/")
  }
  isGuest(){
    if(!this.currentCustomer.username){
      return true;
    }
    else{
      return false;
    }
  }
  login(){
    this.router.navigateByUrl("/login");    
  }
  viewProfile(){
    this.router.navigateByUrl("/profile");
  }
  addToCart(id:string|undefined){
    if(id){
      this.item.itemID=this.products?.filter(e=>e.productId===id)[0].productId;
      this.item.itemName=this.products?.filter(e=>e.productId===id)[0].productname;
      this.item.price=this.products?.filter(e=>e.productId===id)[0].price;
      this.item.quantity=1;
      this.cartService.addToCart(this.item);
      
    }
  }
  getCartSize(){
    this.cartService.getCartSize();
    if(this.cartService.getCartSize()===0){
      console.log(this.cartService.getCartSize());
        return true;
    }    
    else{
      
      this.cartSize=this.cartService.getCartSize();
      return false;
    }
   
  }
  increaseQuantity(item:Item){
    if(item.quantity){
    item.quantity+=1;
  this.cartService.updateCart(item);}
}
decreaseQuantity(item:Item){
  if(item.quantity){
    item.quantity-=1;
  this.cartService.updateCart(item);}
}
formatDate(date:Date|undefined){
    if(date){
      const formattedDate=parseISO(date.toString());
      const finalDate=format(formattedDate,'dd MMMM yyyy');
      return finalDate;
    }
    else{
      return;
    }
}
placeOrder(){
  console.log(this.cartService.getCartItems());
  const min=1000;
  const max=999999;
  const randomNumber=Math.floor(Math.random()*(max-min+1));
  console.log(randomNumber);
  this.order.orderID="#"+randomNumber.toString();
  this.itemList=this.cartService.getCartItems();
  if(this.itemList){
    this.order.restaurant=this.itemList[0].restaurant;
  }
  this.order.itemList=this.cartService.getCartItems();
  console.log(this.order);
  this.orderService.addOrder(this.order).subscribe(
    success=>{
      console.log(success);
    },
    failure=>{
      console.log(failure);
    }
  )  
}
goToHome(){
  this.router.navigateByUrl("/home");
}
getRestaurantById(){
  if(this.orderList && this.orderList[0].restaurant)
  this.getRestaurantService.getRestaurantById(this.orderList[0].restaurant).subscribe(
      success=>{
          this.currentRestaurant=success;
      },
      failure=>{
        console.log(failure);
      }
)
}
}
