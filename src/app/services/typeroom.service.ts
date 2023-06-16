import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TyperoomService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +
      "/typeroom/add",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +
      "/typeroom/update",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getTypeRooms(){
    return this.httpClient.get(this.url+"/typeroom/get");
  }

  delete(id:any){
    return this.httpClient.post(this.url +
      "/typeroom/delete/"+id,{
      header: new HttpHeaders().set('Content.Type','application/json')
    })
  }

  getFilteredTypeRoom(){
    return this.httpClient.get(this.url+"/typeroom/get?filterValue=true");
  }
}
