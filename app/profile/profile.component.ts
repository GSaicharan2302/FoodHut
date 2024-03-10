import { Component, ElementRef, ViewChild } from '@angular/core';
import { Customerupdate } from '../model/Custumerprofile';
import { PopupService } from '../service/popup.service';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { RestaurantProduct } from '../model/RestaurantProduct';
import { Restaurant } from '../model/Restaurant';
import { Customer } from '../model/Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { NavigationService } from '../service/navigation.service';
import { CustomerService } from '../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetrestaurantService } from '../service/getrestaurant.service';
import { CartService } from '../service/cart.service';
import { Item } from '../model/Item';
import { ImageService } from '../service/image.service';
import { Metadata } from '../model/Metadata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  resname?:string;
  city?:string;
  badgeHidden:boolean=false;
  cartSize:number=0;
  item:Item={};
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
  customFileName: string|undefined = this.currentCustomer.emailId;
  selectedImage?:File;
  imageURL:string="";
  constructor(private activatedRoute:ActivatedRoute,private restaurantService:RestaurantService,private navigationService:NavigationService,private customerService:CustomerService,private snackBar:MatSnackBar,private getRestaurantService:GetrestaurantService,private tokenService:TokenService,private router:Router,public cartService:CartService,private imageService:ImageService){
    this.activatedRoute.paramMap.subscribe(data=>{
      this.city=data.get('city')??"";
      this.resname=data.get('resname')??"";
      this.resname=this.resname.replace(/-/g," ");
      
      this.navigationService.currentCity=this.city;
      this.getRestaurant();
    })
    
    this.navigationService.fromHome=false;
    this.navigationService.fromRestaurant=true;
    this.customerService.getCustomerDetails().subscribe(
      success=>{
        this.currentCustomer=success;
        this.downloadImage();
      },
      failure=>{
        console.log(failure);
      }
    )
    
  }

//   toggleColor(id:string|undefined){
//     this.hide=!this.hide;
//     if(!this.checkFavourites(id)){
//     if(id){
//     this.currentCustomer.favourites?.push(id);
//     this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
//       success=>{
//         this.currentCustomer=success;
//         this.snackBar.open("Added to Favourites","Success",{
//           duration:2000
//         })
//       }
//     );
    
//   }
    
//   }
//   else{
//     if(id){
//     this.currentCustomer.favourites=this.currentCustomer.favourites?.filter(e=>e!==id);
//     this.customerService.updateCustomerDetails(this.currentCustomer);
//     }
//   }
// }
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
  getRestaurant(){
    this.favDisplay=false;
    if(this.city){
    this.restaurantService.getRestaurantsByCity(this.city).subscribe(
        success=>{
          this.restaurants=success;
          console.log(this.restaurants);
          this.restaurant=this.restaurants.filter(e=>e.restaurantname?.toLowerCase()===this.resname?.toLowerCase())[0];
          this.getRestaurantByPathName();
        },
        failure=>{
          console.log(failure);
        }
    )}
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
  viewOrders(){
    this.router.navigateByUrl("/orderview");
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
      this.item.itemDescription=this.products?.filter(e=>e.productId===id)[0].description;
      this.item.price=this.products?.filter(e=>e.productId===id)[0].price;
      this.item.restaurant=this.restaurant.emailId;
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

  cartClick(){
    this.router.navigateByUrl("/cartview");
  }
  navigateToHome(){
    this.router.navigateByUrl("/home");
  }
  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }
  downloadImage(){
    if(this.currentCustomer.emailId)
    this.imageService.downloadAssociatedImage(this.currentCustomer.emailId).subscribe(
      success=>{
          this.imageURL=success;
      },
      failure=>{
          console.log(failure);
      }
  )
  }

  onFileSelected(event: any): void {
    this.selectedImage=event.target.files[0];
    if(this.selectedImage){
        this.uploadImage();
    }
  }
  uploadImage(){
    const metadata:Metadata={
      imageType:"CUSTOMER",
      imageOf:this.currentCustomer.emailId,
      fileType:this.selectedImage?.type
    }
    if(this.selectedImage){
      console.log(this.selectedImage?.type);
    this.imageService.uploadImage(this.selectedImage,metadata).subscribe(
      success=>{
        this.downloadImage();  
      },
      failure=>{

      }
    )
  }
  
  // private modifyFileName(file: File): File {
  //   // Get the file extension
  //   const fileExtension = file.name.split('.').pop() || '';
  //   console.log(this.currentCustomer.emailId);
  //   // Create a new File with the custom filename and the original extension
  //   return new File([file], `${this.currentCustomer.emailId}.${fileExtension}`, { type: file.type });
  // }
 
}
}