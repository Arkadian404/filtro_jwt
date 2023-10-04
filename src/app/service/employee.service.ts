import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employee} from "../shared/models/employee";
import {catchError, throwError} from "rxjs";
import {Flavor} from "../shared/models/product/flavor";

const EMPLOYEE_API = 'http://localhost:8080/api/v1/admin/employee'

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
    return this.http.post<Employee>(`${EMPLOYEE_API}/create`, employee)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateEmployee(id:number, employee:Employee){
    return this.http.put<Employee>(`${EMPLOYEE_API}/update/${id}`, employee)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteEmployee(id:number){
    return this.http.delete<Employee>(`${EMPLOYEE_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }



}
