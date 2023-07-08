import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  generateReport(data:any){
    return this.httpClient.post(this.url+
    "/reservation/generateReport",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getPdf(data:any):Observable<Blob>{
    return this.httpClient.post(this.url+"/reservation/getPdf",data,{responseType:'blob'});
  }

  getReservations(){
    return this.httpClient.get(this.url+"/reservation/getReservations");
  }

  delete(id:any){
    return this.httpClient.post(this.url+
    "/reservation/delete/"+id,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }

  generateReportRuc(data:any){
    return this.httpClient.post(this.url+
      "/reservationRuc/generateReport",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getPdfRuc(data:any):Observable<Blob>{
    return this.httpClient.post(this.url+"/reservationRuc/getPdf",data,{responseType:'blob'});
  }

  getReservationsRuc(){
    return this.httpClient.get(this.url+"/reservationRuc/getReservations");
  }

  deleteRuc(id:any){
    return this.httpClient.post(this.url+
      "/reservationRuc/delete/"+id,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }


}
