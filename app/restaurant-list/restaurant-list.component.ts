import { Component } from '@angular/core';
import { RoutesService } from '../service/routes.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {

  constructor(
    private routing:RoutesService
  ){}


  restarantLogin(){
    console.log("restaurant login");
    this.routing.restaurantLoginRoute();    
  }

}
