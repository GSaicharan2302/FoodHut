import { Injectable } from '@angular/core';
// import * as jwt_decode from 'jsonwebtoken';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string|null="";
  decodedToken:any;
  role:string|undefined;
    constructor(private jwtHelperService:JwtHelperService){
        this.getRole();
    }
    getRole(){
      this.token=localStorage.getItem("customer");
      if(this.token){
      this.decodedToken=this.jwtHelperService.decodeToken(this.token);
      console.log(this.decodedToken.role);
      if(this.decodedToken.role==="ROLE_CUSTOMER"){
        this.role="customer";
      }
      else if(this.decodedToken.role==="Restaurant"){
        this.role="restaurant";
      }
      else{
        this.role="guest";
      }
    }
    else{
      this.role="guest";
    }
    }
    
    
    
}
