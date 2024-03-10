import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  fromHome:boolean=false;
  fromRestaurant:boolean=false;
  fromProduct:boolean=false;
  fromCart:boolean=false;
  currentCity?:string
  constructor() { 

  }

}
