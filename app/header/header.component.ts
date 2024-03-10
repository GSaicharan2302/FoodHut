import { Component, OnInit } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { RoutesService } from '../service/routes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  constructor(
    private routing:RoutesService
  ){

  }
  
  ngOnInit(): void {
    

  }  

  loginBtn(){
    console.log("login btn");
    this.routing.loginRoute();
  }
  signupBtn(){
    this.routing.signupRoute();
  }
  homeBtn(){
    this.routing.homeRoute();
  }
  addBookBtn(){
  }
  profileBtn(){
    this.routing.profileRoute();
  }
  restaurantBtn(){
      this.routing.restaurantRoute();
  }


}
