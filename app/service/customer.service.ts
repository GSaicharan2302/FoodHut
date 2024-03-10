import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
url:string="http://localhost:3333/api/v1/customer";
token?:string|null;
  constructor(private httpClient:HttpClient) {
   
  }
  getCustomerDetails(){
    this.token=localStorage.getItem("customer");
    console.log(this.token);
    const hdr=new HttpHeaders({
      'Content-type':'application/json',
      'Authorization':'Bearer '+this.token
    });
    // const reqOptions={"headers":headers};
      return this.httpClient.get<Customer>(this.url+"/getUserDetails",{"headers":new HttpHeaders({
        "Content-Type":"application/json",
        "Authorization":"Bearer "+this.token
      })});
  }
  updateCustomerDetails(customer:Customer){
    return this.httpClient.put(this.url+"/updatecustomer",customer);
  }
}
