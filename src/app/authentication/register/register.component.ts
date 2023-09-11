import { Component, OnInit } from '@angular/core';
import {Register} from "../../shared/models/auth/register.interface";
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {catchError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  register:Register={
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
    role:"USER"
  }
  errorMessage:string = "";
  constructor(private jwtService: AuthenticationService) {
  }

  ngOnInit(){}


  public registerUser(register:Register){
    let resp = this.jwtService.register(register);
    resp.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        this.errorMessage = error;
        console.log(error);
    }});

  }

  onSubmit(form:NgForm){
    console.log(form);
    this.registerUser(this.register);
  }
}
