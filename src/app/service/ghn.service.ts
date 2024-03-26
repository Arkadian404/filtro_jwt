import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {GhnProvince} from "../shared/models/ghn/ghn-province";
import {GhnDistrict} from "../shared/models/ghn/ghn-district";
import {GhnWard} from "../shared/models/ghn/ghn-ward";
import {GhnDeliveryService} from "../shared/models/ghn/ghn-delivery-service";
import {GhnShippingFee} from "../shared/models/ghn/ghn-shipping-fee";

const TOKEN_KEY = "a2e193e1-e84a-11ee-b1d4-92b443b7a897";
const SHOP_ID = 191477;
const API_URL = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data";
const FEE_API = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order";
@Injectable({
  providedIn: 'root'
})
export class GhnService {

  constructor(private http:HttpClient) { }

  shop_address:any = {
    ProvinceID: 202,
    ProvinceName: "Hồ Chí Minh",
    Code: "3695",
    DistrictID: 3695,
    DistrictName: "Thành Phố Thủ Đức",
    WardCode: "90764",
    WardName: "Phường Thảo Điền"
  };


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

  getDeliveryService(endpointDistrictId: number):Observable<GhnDeliveryService[]>{
    return this.http.post<GhnDeliveryService[]>(`${FEE_API}/available-services`, {
      shop_id: SHOP_ID,
      from_district: this.shop_address.DistrictID,
      to_district: endpointDistrictId
    }, {
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

  calculateShippingFee(serviceId:number, serviceTypeId:number,endpointDistrictId:number, endpointWardCode:number, productsWeight:number):Observable<GhnShippingFee>{
    return this.http.post<GhnShippingFee>(`${FEE_API}/fee`, {
      from_district_id: this.shop_address.DistrictID,
      from_ward_code: this.shop_address.WardCode,
      service_id: serviceId,
      service_type_id: serviceTypeId,
      to_district_id: endpointDistrictId,
      to_ward_code: endpointWardCode,
      weight: productsWeight
    }, {
      headers:{
        'Token': TOKEN_KEY,
        'ShopId': SHOP_ID.toString(),
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
