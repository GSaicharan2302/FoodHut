import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerService } from './customer.service';
import { Item } from '../model/Item';
import { Customer } from '../model/Customer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url:string="http://localhost:3333/api/v1/customer";
  total:number=0;
  currentCustomer:Customer={};
  constructor(private httpClient:HttpClient,private customerService:CustomerService,private snackBar:MatSnackBar) {
    this.customerService.getCustomerDetails().subscribe(
      success=>{
        this.currentCustomer=success;
        
      },
      failure=>{
        console.log(failure);
      }
    )
   }
   addToCart(item:Item){
    console.log("Current Customer in cart service is :"+this.currentCustomer);
    if(this.currentCustomer.cart?.filter(e=>e.itemID===item.itemID)&& this.currentCustomer.cart?.filter(e=>e.itemID===item.itemID).length>0){
        this.snackBar.open('Item Already exists','check!',{
          duration:2000,
          panelClass:['mat-toolbar','mat-warn']
        });
    }
    else{
      this.currentCustomer.cart?.push(item);
      this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
        success=>{
          this.currentCustomer=success;
          // this.getCartItems();
        },
        failure=>{
          console.log(failure);
        }
      );
    }
   }
   getCartSize(){
    console.log(this.currentCustomer.cart?.length);
    if(this.currentCustomer.cart && this.currentCustomer.cart.length>0){
      return this.currentCustomer.cart.length;
    }
    else{
      return 0;
    }
      
   }
   removeFromCart(id?:string){
      if(id){
        this.currentCustomer.cart=this.currentCustomer.cart?.filter(e=>e.itemID!==id);
        this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
          success=>{
            this.currentCustomer=success;
            console.log(this.currentCustomer);
            // this.getCartItems();
          },
          failure=>{
            console.log(failure);
          }
        )
      }
   }
   getCartTotal(){
    this.total=0;
      this.currentCustomer.cart?.forEach(e=>{
        if(e.price && e.quantity){
        this.total+=(e.price*e.quantity)}
      });
      return this.total;    
   }
   updateCart(item:Item){
    this.currentCustomer.cart=this.currentCustomer.cart?.filter(e=>e.itemID!==item.itemID);
    this.currentCustomer.cart?.push(item);
    this.customerService.updateCustomerDetails(this.currentCustomer).subscribe(
      success=>{
        this.currentCustomer=success;
        // this.getCartItems();
      },
      failure=>{
        console.log(failure);
      }
    )
   }
   getCartItems(){
    return this.currentCustomer.cart;
   }
}
