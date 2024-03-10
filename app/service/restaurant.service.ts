import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../model/Restaurant';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http:HttpClient,
    private token:TokenService

  ) { }

  baseUrl="http://localhost:3333";
  restaurantUrl = `${this.baseUrl}/restaurants`;

  registerRestaurant(restaurantForm:any):Observable<Restaurant>{
    return this.http.post<Restaurant>( `${this.restaurantUrl}/register`,restaurantForm ); 
  }

  getUserDetails(token:string):Observable<Restaurant>{
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Restaurant>(`${this.restaurantUrl}/getUser`, {headers:hdr} );

  }
  getRestaurantById(id:string){
      return this.http.get<Restaurant>(this.restaurantUrl+"/getRestaurantById/"+id);
  }

  getOrders(){}

  addProduct(){}

  deleteProduct(){}

  updateProduct(){}

  addOrder(){}

}
