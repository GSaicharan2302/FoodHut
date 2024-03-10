import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { RestaurantProduct } from '../model/RestaurantProduct';

@Injectable({
  providedIn: 'root'
})
export class GetrestaurantService {
  baseUrl="http://localhost:3333";
  restaurantUrl = `${this.baseUrl}/restaurants`;
  constructor(private http:HttpClient) { }
  getRestaurantById(id:string){
    return this.http.get<Restaurant>(this.restaurantUrl+"/getRestaurantById/"+id);
}
  getRestaurant(){
    const token=localStorage.getItem("customer");
    return this.http.get<Restaurant>(this.restaurantUrl+"/getUser",{headers:new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":"Bearer "+token
    })});

   
  }
  updateRestaurant(restaurant:Restaurant){
    return this.http.post<Restaurant>(this.restaurantUrl+"/updateRestaurant",restaurant);
  }
  addProduct(product:RestaurantProduct){
      return this.http.post<Restaurant>(this.restaurantUrl+"/products",product,{headers:new HttpHeaders({
        "Content-type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("customer")
      })});
  }
}
