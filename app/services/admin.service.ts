import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string="http://localhost:3333/api/auth/adminCheck";
  constructor(private httpClient:HttpClient) {

   }
   adminCheck(loginData:any){
    return this.httpClient.post(this.url,loginData);
   }
}
