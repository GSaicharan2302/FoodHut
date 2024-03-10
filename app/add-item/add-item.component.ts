import { Component, ElementRef, ViewChild } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { GetrestaurantService } from '../service/getrestaurant.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { ImageService } from '../service/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Metadata } from '../model/Metadata';
import { RestaurantProduct } from '../model/RestaurantProduct';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  selectedImage?:File;
  submitDisabled:boolean=true;
  product:RestaurantProduct={};
  @ViewChild('fileInput') fileInput!: ElementRef;
  onFileSelected(event: any): void {
    this.selectedImage=event.target.files[0];
    if(this.selectedImage){
        this.uploadImage();
    }
  }
  uploadImage(){
    console.log(this.itemForm.get("productId")?.value);
    const metadata:Metadata={
      imageType:"ITEM",
      imageOf:this.itemForm.get("productId")?.value as string|undefined,
      fileType:this.selectedImage?.type
    }
    if(this.selectedImage){
      console.log(this.selectedImage?.type);
    this.imageService.uploadImage(this.selectedImage,metadata).subscribe(
      success=>{
        console.log(success);
        this.snackBar.open("Image uploaded successfully!","Success",{
          duration:2000,
          panelClass:['mat-toolbar','mat-primary']
        });
        this.submitDisabled=false;
      },
      failure=>{
          console.log(failure);
          this.snackBar.open("Image upload failed!","Failure",{
            duration:2000,
            panelClass:['mat-toolbar','mat-warn']
          });
      }
    )
    }
  }
viewProfile() {
throw new Error('Method not implemented.');
}
openFileDialog(event:Event){
  event.preventDefault();
  this.fileInput.nativeElement.click();
}
  restaurant:Restaurant={};
  itemForm=new FormGroup({
    productId:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    productname:new FormControl('',[Validators.required]),
    cuisineType:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required,Validators.pattern(/^(10000|\d{1,4})$/)]),
    rating:new FormControl('',[Validators.required,Validators.pattern(/^([0-4](\.\d)?|5\.0)$/)]),
    duration:new FormControl('',[Validators.required])
    
  });
  get productId(){
    return this.itemForm.get("productId");
  }
  get description(){
    return this.itemForm.get("description");
  }
  get productname(){
    return this.itemForm.get("productname");
  }
  get price(){
    return this.itemForm.get("price");
  }
  get rating(){
    return this.itemForm.get("rating");
  }
  get duration(){
    return this.itemForm.get("duration");
  }
  get cuisineType(){
    return this.itemForm.get("cuisineType");
  }
  constructor(private getRestaurantService:GetrestaurantService,private tokenService:TokenService,private router:Router,private imageService:ImageService,private snackBar:MatSnackBar){
    this.getRestaurantService.getRestaurant().subscribe(
      success=>{
          this.restaurant=success;
          console.log(this.restaurant);
      },
      failure=>{
        console.log(failure);
      }
    )
  }
  logout() {
    this.tokenService.storeToken("customer","");
    this.goToHome();
  }
  goToHome(){
    this.router.navigateByUrl("home");
  }
  formSubmit(){
    console.log(this.itemForm.value);
    this.product=this.itemForm.value as RestaurantProduct;   
    this.getRestaurantService.addProduct(this.product).subscribe(
      success=>{
        console.log(success);
        this.snackBar.open("Product Added Successfully","Success",{
          duration:2000,
          panelClass:['mat-toolbar','mat-primary']
        });
      },
      failure=>{
          console.log(failure);
          this.snackBar.open("Product not added!","Failure",{
            duration:2000,
            panelClass:["mat-toolbar","mat-warn"]
          });
      }
    ) 
  }
}
