import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {Product} from "../../shared/models/product/product";
import {ProductDto} from "../../shared/dto/product-dto";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {ProductResponse} from "../../shared/response/product-response";

const API_URL = `${environment.springboot_url}/api/v1/user/search`;
// const API_URL = `${environment.springboot_url}/test/search`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    searchResults = new BehaviorSubject(null);
    searchResults$ = this.searchResults.asObservable();

  constructor(private readonly http:HttpClient) { }

  getSearchResult(searchValue:string){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${API_URL}?query=${searchValue}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
