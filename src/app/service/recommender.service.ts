import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "../shared/dto/product-dto";


const API = 'http://localhost:8080/api/v1/user/recommender';


@Injectable({
  providedIn: 'root'
})
export class RecommenderService {

  constructor(private http: HttpClient) { }

  recommendProductsForUser(userId: number){
    return this.http.get<ProductDto[]>(`${API}/recommend/${userId}`);
  }

}
