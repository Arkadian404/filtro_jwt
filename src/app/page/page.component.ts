import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../service/token.service";
import {AuthenticationService} from "../service/authentication.service";
import {UtilService} from "../service/util.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit{

  isLoggedIn = false;
  username = '';

  constructor(public tokenService:TokenService,
              private authService: AuthenticationService,
              private utilService:UtilService,
              private router:Router) {
  }

  ngOnInit(): void {
      this.isLoggedIn = true;
      this.username = this.tokenService.getUsername();
  }


  navigateToUser(){
    this.router.navigate(['/user-info']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.tokenService.clearToken();
        this.username =null;
        this.utilService.openSnackBar('Đăng xuất thành công', 'Đóng');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.utilService.openSnackBar(err, 'Đóng');
      }
    });
  }

}
