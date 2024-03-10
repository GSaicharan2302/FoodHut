import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../model/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url:string="http://localhost:3333/restaurants/getRestaurantByCity/";
  constructor(private httpClient:HttpClient) { }
  getRestaurantsByCity(city:string){
      return this.httpClient.get<Restaurant[]>(this.url+city);
  }
}
