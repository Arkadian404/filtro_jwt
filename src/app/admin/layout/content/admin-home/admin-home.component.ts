import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../../shared/models/employee";
import {AuthenticationService} from "../../../../service/authentication.service";
import {Router} from "@angular/router";
import {UtilService} from "../../../../service/util.service";
import {TokenService} from "../../../../service/token.service";

@Component({
  selector: 'app-main',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  response: Employee;
  isEmployee = false;
  isAuthenticated = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private utilService: UtilService,
              private tokenService: TokenService) {
  }


  ngOnInit(): void {
    this.getAccess();
    this.isAuthenticated = this.tokenService.isLoggedIn() && (this.tokenService.getRole() === 'ADMIN' || this.tokenService.getRole() === 'EMPLOYEE') ? this.isAuthenticated = true : this.isAuthenticated = false;
  }


  getAccess(){
    this.authService.currentEmployeeAccess().subscribe({
      next: (data) => {
        this.response = data;
        this.isEmployee = this.tokenService.getRole() === 'EMPLOYEE';
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
