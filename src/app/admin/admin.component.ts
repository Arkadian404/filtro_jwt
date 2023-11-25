import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {TokenService} from "../service/token.service";
import {Router} from "@angular/router";
import {UtilService} from "../service/util.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements DoCheck, OnInit {

  // @ts-ignore
  name: string;
  sideNavOpen = true;
  isEmployee = false;
  isAuthenticated = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private utilService: UtilService,
              private tokenService: TokenService) {
  }

  ngOnInit() {
    // this.isEmployee = this.tokenService.getRole() === 'EMPLOYEE';
    // this.isAuthenticated = this.tokenService.isLoggedIn() && (this.tokenService.getRole() === 'ADMIN' || this.tokenService.getRole() === 'EMPLOYEE') ? this.isAuthenticated = true : this.isAuthenticated = false;
  }

  ngDoCheck(): void {
    this.isEmployee = this.tokenService.getRole() === 'EMPLOYEE';
    this.isAuthenticated = this.tokenService.isLoggedIn() && (this.tokenService.getRole() === 'ADMIN' || this.tokenService.getRole() === 'EMPLOYEE') ? this.isAuthenticated = true : this.isAuthenticated = false;
    this.name = this.tokenService.getUsername();
  }

  sideNavToggle() {
    this.sideNavOpen = !this.sideNavOpen;
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.tokenService.clearToken();
        this.utilService.openSnackBar('Đăng xuất thành công', 'Đóng');
        this.router.navigate(['/admin/login']);
      },
      error: (err) => {
        console.log(err);
        this.utilService.openSnackBar(err, 'Đóng');
      }
    });
  }
}
