import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private routing:Router
  ) { }

  homeRoute(){
    this.routing.navigate(['/home']);
  }

  loginRoute(){
    this.routing.navigate(['/login']);
  }
  signupRoute(){
    this.routing.navigate(['/signup']);
  }
  registrationRoute(){
    this.routing.navigate(['/registration']);
  }
  profileRoute(){
    this.routing.navigate(['/profile']);
  }
  restaurantRoute(){
    this.routing.navigate(['/restaurant'])
  }
  registerRestaurantRoute(){
    this.routing.navigate(['/register-restaurant'])
  }
  restaurantListRoute(){
    this.routing.navigate(['/restaurant-list'])
  }
  restaurantLoginRoute(){
    this.routing.navigate(['/restaurant-login'])
  }
  


}
