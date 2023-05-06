import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +
      "/customer/add",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +
      "/customer/update",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getCustomers(){
    return this.httpClient.get(this.url+"/customer/get");
  }

  delete(id:any){
    return this.httpClient.post(this.url +
    "/customer/delete/"+id,{
      header: new HttpHeaders().set('Content.Type','application/json')
    })
  }
}
