import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  decodeJWT(token:any){
    let payload = token.split('.')[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  }

  isAccessTokenExpired(){
    const date = new Date();
    return date.getTime() > this.getAccessTokenExpirationDate();
  }

  isRefreshTokenExpired(){
    const date = new Date();
    return date.getTime() > this.getRefreshTokenExpirationDate();
  }

  getAccessTokenExpirationDate(){
    const {exp} = this.decodeJWT(this.getAccessToken());
    return exp*1000;
  }

  getUsername(){
    if(localStorage.getItem("accessToken") != null){
      const {sub} = this.decodeJWT(this.getAccessToken());
      return sub;
    }
  }

  getRole(){
    if(localStorage.getItem("accessToken") != null){
      const {role} = this.decodeJWT(this.getAccessToken());
      return role.find((role: string)=> role.startsWith('ROLE_')).replace("ROLE_", "");
    }
  }

  isAdmin(){
    return this.getRole() == "ADMIN";
  }

  isEmployee(){
    return this.getRole() == "EMPLOYEE";
  }

  isUser(){
    return this.getRole() == "USER";
  }

  isLoggedIn(){
    return !!this.getAccessToken();
  }

  getRefreshTokenExpirationDate(){
    const {exp} = this.decodeJWT(this.getRefreshToken());
    return exp*1000;
  }

  getAccessToken(){
    if(localStorage.getItem("accessToken") == null){
      return "";
    }
    return localStorage.getItem("accessToken");
  }

  getRefreshToken(){
    if(localStorage.getItem("refreshToken") == null){
      return "";
    }
    return localStorage.getItem("refreshToken");
  }

  setAccessToken(token:string){
    localStorage.setItem("accessToken", token);
  }

  setRefreshToken(token:string){
    localStorage.setItem("refreshToken", token);
  }

  clearToken(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
