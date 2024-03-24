import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {GhnProvince} from "../shared/models/ghn-province";
import {GhnDistrict} from "../shared/models/ghn-district";
import {GhnWard} from "../shared/models/ghn-ward";

const TOKEN_KEY = "a2e193e1-e84a-11ee-b1d4-92b443b7a897";
// const TOKEN_KEY = "api????";
const API_URL = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data";
@Injectable({
  providedIn: 'root'
})
export class GhnService {

  constructor(private http:HttpClient) { }

  getProvinces():Observable<GhnProvince[]>{
    return this.http.get<GhnProvince[]>(`${API_URL}/province`, {
     headers:{
       'Token': TOKEN_KEY,
     }
    }).pipe(
      catchError(err=> {
        return throwError(()=> new Error(err.error.message))}),
      map((data:any)=>{
        return data.data;
      }
    ));
  }

  getDistricts(provinceId:number):Observable<GhnDistrict[]>{
    const obj = {
      province_id: provinceId
    };
    return this.http.post<GhnDistrict[]>(`${API_URL}/district`, JSON.stringify(obj),{
      headers:{
        'Token': TOKEN_KEY,
      }
    }).pipe(
      catchError(err=> {
        return throwError(()=> new Error(err.error.message))}),
      map((data:any)=>{
        return data.data;
      }
    ));
  }

  getWards(districtId:number):Observable<GhnWard[]>{
    const obj = {
      district_id: districtId
    };
    return this.http.post<GhnWard[]>(`${API_URL}/ward?district_id`, JSON.stringify(obj),{
      headers:{
        'Token': TOKEN_KEY,
      }
    }).pipe(
      catchError(err=> {
        return throwError(()=> new Error(err.error.message))}),
      map((data:any)=>{
        return data.data;
      }
    ));
  }


}
