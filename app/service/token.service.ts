import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { NullException } from '../exception/NullException';
import { DecodedTokenObject } from '../model/DecodedTokenObject';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeToken(key:string,value:string){
    localStorage.setItem(key,value);
  }

  getToken(key:string):string | null{
    const token:string | null = localStorage.getItem(key);
    if(token){
      return token;
    }else{
      return null;
      throw new NullException("token exception");
      
    }
  }

  decodeToken(tokenString:string):DecodedTokenObject{ 
    return jwtDecode( tokenString ) as DecodedTokenObject;
  }

  removeToken(key:string){
    localStorage.removeItem(key);
  }
}
