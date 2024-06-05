import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../../shared/models/employee";
import {catchError, throwError} from "rxjs";
import {Flavor} from "../../shared/models/product/flavor";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const EMPLOYEE_API = `${environment.springboot_url}/api/v1/admin/employee`

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getEmployeeList(){
    return this.http.get<Employee[]>(`${EMPLOYEE_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getEmployeeById(id:number){
    return this.http.get<Employee>(`${EMPLOYEE_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createEmployee(employee:Employee){
    return this.http.post<SuccessMessage>(`${EMPLOYEE_API}/create`, employee)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateEmployee(id:number, employee:Employee){
    return this.http.put<SuccessMessage>(`${EMPLOYEE_API}/update/${id}`, employee)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteEmployee(id:number){
    return this.http.delete<SuccessMessage>(`${EMPLOYEE_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }



}
