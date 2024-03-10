import { Component } from '@angular/core';
import { RoutesService } from '../service/routes.service';

@Component({
  selector: 'app-restaurant-panel',
  templateUrl: './restaurant-panel.component.html',
  styleUrls: ['./restaurant-panel.component.css']
})
export class RestaurantPanelComponent {
  constructor(
    private routing:RoutesService
  ){}


  viewRestaurantsBtn(){
    this.routing.restaurantListRoute();
  }
  registerRestaurantBtn(){
    this.routing.registerRestaurantRoute();
  }

}
