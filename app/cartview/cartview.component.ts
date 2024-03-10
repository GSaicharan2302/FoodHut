import { Component } from '@angular/core';
import { Item } from '../model/Item';
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
import { Order } from '../model/Order';
import { OrderService } from '../service/order.service';
import { MatDialog } from '@angular/material/dialog';
import { AddressformComponent } from '../addressform/addressform.component';
import { Address } from '../model/Address';
import { ImageService } from '../service/image.service';

@Component({
  selector: 'app-cartview',
  templateUrl: './cartview.component.html',
  styleUrls: ['./cartview.component.css']
})
export class CartviewComponent {
restaurantNavigate() {
  let city:string=this.currentCustomer.address?.city?.toLowerCase() as string;
  this.router.navigateByUrl("/restaurantview/"+city);
}
openDialog() {
let dialogRef=this.dialog.open(AddressformComponent,{
  width:'400px',
  height:'490px'
});
dialogRef.afterClosed().subscribe(
  result=>{
    if(result!==undefined){
    console.log(result);
    this.isChangeDeliveryAddress=true;
    this.deliveryAddress=result;
    this.isAddressChanged=true;
    this.currentCustomer.deliveryAddress=this.deliveryAddress;
    this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
      success=>{
        console.log(success);
      },
      failure=>{
        console.log(failure);
      }
    );
    }
  }
)
// dialogRef.close("Pizza!");
}
 
  badgeHidden:boolean=false;
  cartSize:number=0;
  tempItem:Item={};
  item:Item={};
  deliveryAddress:Address={};
  isChangeDeliveryAddress:boolean=false;
  isAddressChanged:boolean=false;
  itemList:Item[]|undefined;
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
  restaurants:Restaurant[]=[];
  tempRestaurants:Restaurant[]=[];
  currentCustomer:Customer={};
  imageMap=new Map<String,String>();
  constructor(private activatedRoute:ActivatedRoute,private restaurantService:RestaurantService,private navigationService:NavigationService,private customerService:CustomerService,private snackBar:MatSnackBar,private getRestaurantService:GetrestaurantService,private tokenService:TokenService,private router:Router,public cartService:CartService,private orderService:OrderService,public dialog:MatDialog,private imageService:ImageService){
    this.customerService.getCustomerDetails().subscribe(
      success=>{
        this.currentCustomer=success;
        console.log(this.currentCustomer);
        this.currentCustomer.deliveryAddress={};
        this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
          success=>{
            this.currentCustomer=success;
          },
          failure=>{
              console.log(failure);
          }
        )
      },
      failure=>{
        console.log(failure);
      }
    )
    console.log("current customer is : ");
    this.cartService.getCartItems()?.forEach(e=>{
      this.downloadImage(e.itemID);
    })
  }

  downloadImage(id:string|undefined){
    if(id){
      this.imageService.downloadAssociatedImage(id).subscribe(
        success=>{
          this.imageMap.set(id,success);
        },
        failure=>{
          console.log(failure);
        }
      )
    }
  }
  getImageURL(id:string|undefined){
    if(id){
      return this.imageMap.get(id);
    }
    return;
  }
checkCity(){
  const city=localStorage.getItem("city");
  if(city?.toLowerCase()!==this.currentCustomer.address?.city?.toLowerCase()){
    if(this.currentCustomer.deliveryAddress && city!=this.currentCustomer.deliveryAddress.city)
    return true;
    else
    return false;
  }
  else{
    return false;
  }
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
goToHome(event:Event){
  event.preventDefault();
  this.router.navigateByUrl("/home");
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
      this.cartService.currentCustomer=success;
      console.log(success);
      this.router.navigateByUrl("/orderview");
    },
    failure=>{
      console.log(failure);
    }
  )  
}

goToOrders(){
  this.router.navigateByUrl("/orderview");
}

}
