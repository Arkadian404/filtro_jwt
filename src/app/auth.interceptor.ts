import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable, shareReplay,
  switchMap,
  take, tap,
  throwError
} from 'rxjs';
import {TokenService} from "./service/token.service";
import {AuthenticationService} from "./service/user/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefresh = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private tokenService:TokenService,
              private authenticationService:AuthenticationService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this.tokenService.getAccessToken();
    if (accessToken){
      request = this.setHeaders(request, accessToken);
    }
    return next.handle(request).pipe(
      catchError((err) =>{
        console.log(err.status);
        console.log(err instanceof HttpErrorResponse)
        if(err.status === 401 && err instanceof HttpErrorResponse){
          console.log("CALLING!!!!!!!!!!!!!")
          return this.handleAuthorizationError(request, next);
          }
        return throwError(()=>err);
      })
    );
  }

  private setHeaders(request:HttpRequest<any>, token:string){
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  private handleAuthorizationError(request:HttpRequest<any>, next:HttpHandler){
    console.log("CALLING HANDLE")
    console.log('1'+this.isRefresh)
    console.log('rt expired:'+ this.tokenService.isRefreshTokenExpired())
    if(!this.tokenService.getRefreshToken() || !this.tokenService.getAccessToken() || this.tokenService.isRefreshTokenExpired()){
      // this.router.navigate(['/login']);
      // this.tokenService.clearToken();
      this.authenticationService.logout();
      this.tokenService.clearToken();
      this.router.navigate(['/login']);
    }
    if(!this.isRefresh){
      this.isRefresh = true;
      this.refreshTokenSubject.next(null);
      console.log('2'+this.isRefresh)
      console.log("CALLING HANDLE 2")
      const isLoggedIn = this.tokenService.isLoggedIn();
      console.log('isLoggedIn', isLoggedIn)
      if(!isLoggedIn){
        return next.handle(request);
      }
      return this.authenticationService.refreshToken().pipe(
        switchMap((res)=>{
          this.isRefresh = false;
          console.log('3'+this.isRefresh)
          this.refreshTokenSubject.next(res.accessToken);
          console.log("CALLING HANDLE SWITCHMAP")
          return next.handle(this.setHeaders(request, res.accessToken));
        })
      )
    }else{
      return this.refreshTokenSubject.pipe(
        shareReplay(1),
        filter(token=>token !== null),
        take(1),
        switchMap((token:any)=>{
          console.log("CALLING HANDLE SWITCHMAP 2")
          return next.handle(this.setHeaders(request, token.accessToken));
        })
      )
    }
  }
}
