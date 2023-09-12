import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Flavor} from "../shared/models/flavor";
import {catchError, throwError} from "rxjs";

const FLAVOR_API:string ="http://localhost:8080/api/v1/admin/flavor"

@Injectable({
  providedIn: 'root'
})
export class FlavorService {

  constructor(private http:HttpClient) { }

  getFlavorList(){
    return this.http.get<Flavor[]>(`${FLAVOR_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getFlavorById(id:number){
    return this.http.get<Flavor>(`${FLAVOR_API}/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      );
  }

  createFlavor(flavor:Flavor){
    return this.http.post<Flavor>(`${FLAVOR_API}/create`, flavor)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  updateFlavor(id:number, flavor:Flavor){
    return this.http.put<Flavor>(`${FLAVOR_API}/update/${id}`, flavor)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  deleteFlavor(id:number){
    return this.http.delete<Flavor>(`${FLAVOR_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }


}
