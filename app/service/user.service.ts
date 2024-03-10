import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/LoginResponse';
import { Login } from '../model/Login';
import { Registration } from '../model/Registration';
import { Customer } from '../model/Customer';
import { TokenService } from './token.service';
import { Customerupdate } from '../model/Custumerprofile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private  tokenService:TokenService
  ) { }

  baseUrl="http://localhost:3333";
  customerUrl = `${this.baseUrl}/api/v1/customer` ;
  authUrl=`${this.baseUrl}/api/auth`;

  customerAuthLogin(login:any){
    return this.http.post<any>( `${this.authUrl}/loginCheck`,login );
  }
  checkOTP(num:number,user:any){
    return this.http.post<LoginResponse>(this.authUrl+"/checkOTP/"+num,user)
  }

  customerRegister(registration:Registration):Observable<Customer>{
    return this.http.post(`${this.customerUrl}/saveCustomer`, registration);
  }
  getCustomerDetails(token:string):Observable<Customer>{


    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Customer>(`${this.customerUrl}/getUserDetails`, {headers:hdr});

  }
  getCustomerDetails1(token:string):Observable<Customerupdate>{


    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<Customerupdate>(`${this.customerUrl}/getUserDetails`, {headers:hdr});

  }
  updateCustomerDetails(updatedCustomer: Customerupdate): Observable<Customerupdate> {
    const token = this.tokenService.getToken('customer');

    if (!token) {
      throw new Error('Token non-existent');
    }

    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.put<Customerupdate>(`${this.customerUrl}/updatecustomer`, updatedCustomer, { headers: hdr });
  }


}
