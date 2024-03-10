import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/Order';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseurl:string="http://localhost:3333/api/v1/customer";
  constructor(private httpClient:HttpClient) { }
  addOrder(order:Order){
    console.log(localStorage.getItem("customer"));
    return this.httpClient.post<Customer>(this.baseurl+"/addOrder",order,{"headers":new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+localStorage.getItem("customer")
    })});
  }
  updateOrder(id:string){
      console.log(localStorage.getItem("customer"));
        return this.httpClient.put<Customer>(this.baseurl+"/updateOrder",id,{headers:new HttpHeaders({
          'Content-type':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("customer")
        })});
      }
  
}
