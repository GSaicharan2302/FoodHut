import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ImageService } from '../service/image.service';
import { Metadata } from '../model/Metadata';
import { Restaurant } from '../model/Restaurant';
import { Address } from '../model/Address';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-register',
  templateUrl: './restaurant-register.component.html',
  styleUrls: ['./restaurant-register.component.css']
})
export class RestaurantRegisterComponent {
  constructor(private imageService:ImageService,private snackBar:MatSnackBar,private restaurantService:RestaurantService){

  }
openDialog(event: Event) {
event.preventDefault();
this.fileInput.nativeElement.click();
}
onFileSelected(event: any) {
  this.selectedImage=event.target.files[0];
  if(this.selectedImage){
      this.changeSubmitStatus();
  }
}
selectedImage?:File;
changeSubmitStatus(){
  this.submitDisabled=false;
}
stateChanged(event: MatAutocompleteSelectedEvent) {
  this.cityBtn=false;
    const str=event.option.value;
    const idx=this.states.indexOf(str);
    this.state_active=[];
    this.state_active.push(this.cities[idx]);
}
@ViewChild('fileInput') fileInput!: ElementRef;
  states:string[]=["Uttar Pradesh","Gujarat","Karnataka","Tamil Nadu","Delhi","Haryana","Assam","Telangana","West Bengal","Maharashtra","Himachal Pradesh","Bihar"];
  cities:string[]=["agra","ahmedabad","bangalore","chennai","delhi","faridabad","guwahati","hyderabad","kolkata","mumbai","dharamsala","patna"];
  state_active:string[]=this.cities;
  cityBtn:boolean=true;
  submitDisabled:boolean=true;
  restaurant:Restaurant={};
  registerForm=new FormGroup({
    emailID:new FormControl('',[Validators.required,Validators.pattern(/^[^\d]\w+@(?:gmail\.com|yahoo\.com|outlook\.com)$/)]),
    restaurantName:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    cuisineType:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    ownername:new FormControl('',[Validators.required]),
    imageID:new FormControl('',[Validators.required]),
    
    zipcode:new FormControl('',[Validators.required,Validators.pattern(/^\d{6}$/)]),
    duration:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    contactno:new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)]),
    rating:new FormControl('',[Validators.required]),
    addressForm:new FormGroup({
      doorno:new FormControl('',[Validators.required,Validators.pattern(/^\d{1,2}\/\d{1,2}$/)]),
      street:new FormControl('',[Validators.required]),
      area:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required])
    }),
    category:new FormControl('',[Validators.required])
  })
  get emailID(){
    return this.registerForm.get('emailID');
  }
  get restaurantName(){
    return this.registerForm.get('restaurantName');
  }
  get description(){  
    return this.registerForm.get('description');
  }
  get cuisineType(){
    return this.registerForm.get('cuisineType');
  }
  get password(){
    return this.registerForm.get("password");
  }
  get ownername(){
    return this.registerForm.get("ownername");
  }
  get imageID(){
    return this.registerForm.get("imageID");
  }
  get doorno(){
    return this.registerForm.get("addressForm.doorno");
  }
  get street(){
    return this.registerForm.get("addressForm.street");
  }
  get area(){
    return this.registerForm.get("addressForm.area");
  }
  get city(){
    return this.registerForm.get("addressForm.city");
  }
  get state(){
    return this.registerForm.get("addressForm.state");
  }
  get contactno(){
    return this.registerForm.get("contactno");
  }
  get rating(){
    return this.registerForm.get("rating");
  }
  get price(){
    return this.registerForm.get("price");
  }
  get zipcode(){
    return this.registerForm.get("zipcode");
  }
  get duration(){
    return this.registerForm.get("duration");
  }
  get category(){
    return this.registerForm.get("category");
  } 
  formSubmit(){
    // console.log(this.registerForm.value);
    console.log(this.restaurant.category);
    this.restaurant.emailId=this.registerForm.get("emailID")?.value as string|undefined;
    this.restaurant.restaurantname=this.registerForm.get("restaurantName")?.value as string|undefined;
    this.restaurant.description=this.registerForm.get("description")?.value as string|undefined;
    this.restaurant.cuisineType=this.registerForm.get("cuisineType")?.value as string|undefined;
    this.restaurant.password=this.registerForm.get("password")?.value as string|undefined;
    this.restaurant.ownername=this.registerForm.get("ownername")?.value as string|undefined;
    this.restaurant.imageID=this.registerForm.get("imageID")?.value as string|undefined;
    this.restaurant.location=this.registerForm.get("addressForm")?.value as Address|undefined;
    this.restaurant.duration=parseInt(this.registerForm.get("duration")?.value as string) as number|undefined;
    this.restaurant.price=parseInt(this.registerForm.get("price")?.value as string) as number|undefined;
    this.restaurant.contactNumber=parseInt(this.registerForm.get("contactno")?.value as string) as number|undefined;
    const strItems:string[]=this.registerForm.get("category")?.value?.split(",") as string[];
    this.restaurant.category=[];
    strItems.forEach(e=>{
      console.log(e);
      // if(this.restaurant.category)
      this.restaurant.category?.push(e);
    })
    this.restaurant.rating=parseInt(this.registerForm.get("rating")?.value as string) as number|undefined; 
    console.log(this.restaurant);
    this.restaurantService.registerRestaurant(this.restaurant).subscribe(
      success=>{
        this.uploadImage();
        this.snackBar.open("Restaurant Registered !!!","success",{
          duration:2000,
          panelClass:["mat-toolbar","mat-primary"]
        })
      },
      failure=>{
        this.snackBar.open("Restaurant registration failed !!!","Failure",{
          duration:2000,
          panelClass:["mat-toolbar","mat-warn"]
        })
      }
    )
  }
  uploadImage(){
        const metadata:Metadata={
          imageOf:this.registerForm.get("imageID")?.value as string|undefined,
          imageType:"RESTAURANT",
          fileType:this.selectedImage?.type
        }
       if(this.selectedImage) 
       this.imageService.uploadImage(this.selectedImage,metadata).subscribe(
          success=>{
            this.snackBar.open("Image Uploaded Successful","Success",{
              duration:2000,
              panelClass:["mat-toolbar","mat-primary"]
            })
          },
          failure=>{
            this.snackBar.open("Image Uploaded Failure","Failure",{
              duration:2000,
              panelClass:["mat-toolbar","mat-warn"]
            })
          }
        );
  }
}
