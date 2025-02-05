import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../../../../shared/response/user-response";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {UtilService} from "../../../../service/util.service";
import {TokenService} from "../../../../service/token.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-app-callback',
  templateUrl: './app-callback.component.html',
  styleUrls: ['./app-callback.component.scss']
})
export class AppCallbackComponent implements OnInit{
  isLoading = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService,
              private utilService: UtilService,
              private tokenService: TokenService) {
  }


  ngOnInit() {
    const url = this.router.url;
    console.log(url);
    this.activatedRoute.queryParams.subscribe(params =>{
        const code = params['code'];
        if (code){
          this.authService.exchangeCodeToToken(code)
            .pipe(tap(()=> this.isLoading = true))
            .subscribe({
            next: (data) => {
              this.tokenService.setAccessToken(data.accessToken);
              this.tokenService.setRefreshToken(data.refreshToken);
              this.utilService.openSnackBar('Đăng nhập thành công', 'Đóng')
              this.router.navigate(['/home']);
            },
            error: (error) =>{
              this.utilService.openSnackBar(error, 'Đóng');
              this.router.navigate(['/login']);
            }
          });
        }else{
          this.router.navigate(['/login']);
        }
    })
  }
}
