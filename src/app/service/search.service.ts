import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, throwError} from "rxjs";

const API_URL = 'http://localhost:8080/api/v1/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchValue = new BehaviorSubject(null);
  currentSearchValue = this.searchValue.asObservable();
  setSearchValue(searchValue:string){
    this.searchValue.next(searchValue);
  }

  constructor(private http:HttpClient) { }

  getSearchResult(searchValue:string){
    return this.http.get(`${API_URL}/search?query=${searchValue}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }


}
