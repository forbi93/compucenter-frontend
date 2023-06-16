import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +
      "/room/add",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  update(data:any){
    return this.httpClient.post(this.url +
      "/room/update",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getRooms(){
    return this.httpClient.get(this.url+"/room/get");
  }

  delete(id:any){
    return this.httpClient.post(this.url +
      "/room/delete/"+id,{
      header: new HttpHeaders().set('Content.Type','application/json')
    })
  }

  updateStatus(data:any){
    return this.httpClient.post(this.url +
    "/room/updateStatus",data,{
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getRoomByTypeRoom(id:any){
    return this.httpClient.get(this.url+"/room/getByTypeRoom/"+id);
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/room/getById/"+id);
  }

}
