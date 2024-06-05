import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "../shared/dto/product-dto";
import {environment} from "../../environments/environment";


const API = `${environment.springboot_url}/api/v1/user/recommender`;
const FastAPI = `${environment.fastapi_url}`


@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  constructor(private http: HttpClient) { }

  recommendProductsForUser(userId: number){
    return this.http.get<ProductDto[]>(`${API}/recommend/${userId}`);
  }

  testApi(){
    return this.http.get<string>(`${FastAPI}`);
  }

}
