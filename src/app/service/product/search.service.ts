import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {Product} from "../../shared/models/product/product";
import {ProductDto} from "../../shared/dto/product-dto";
import {environment} from "../../../environments/environment";

const API_URL = `${environment.springboot_url}/api/v1/user/search`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    searchResults = new BehaviorSubject(null);
    searchResults$ = this.searchResults.asObservable();

  constructor(private http:HttpClient) { }

  getSearchResult(searchValue:string){
    return this.http.get<ProductDto[]>(`${API_URL}/search?query=${searchValue}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
