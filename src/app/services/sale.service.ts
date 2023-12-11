import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getSales(){
    return this.httpClient.get(this.url+"/Venta");
  }



  delete(id:any){

    const deleteUrl = `${this.url}/Venta/${id}`;

    return this.httpClient.delete(deleteUrl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  add(data: any) {
    return this.httpClient.post(this.url + "/Venta", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Error de validación, puedes manejar los detalles específicos aquí
            console.error('Error de validación:', error.error);
            // Puedes lanzar un nuevo observable con la información de error específica si es necesario
            return throwError('Error de validación: ' + JSON.stringify(error.error));
          } else {
            // Otro tipo de error, manejar según sea necesario
            console.error('Error en la solicitud:', error);
            return throwError('Error en la solicitud. Por favor, inténtalo de nuevo.');
          }
        })
      );
  }

  update(data: any) {
    const url = `${this.url}/Venta/${data.idVenta}`; // Asumiendo que 'idVenta' es el identificador único

    return this.httpClient.put(url, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
