import { Component } from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../service/token.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {


  constructor(private jwtService:AuthenticationService,
              private tokenService:TokenService,
              private router: Router) {
  }


  onLogout() {
    this.jwtService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.tokenService.clearToken();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
