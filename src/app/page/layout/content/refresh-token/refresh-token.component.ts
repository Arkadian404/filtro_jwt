import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {AuthenticationResponse} from "../../../../shared/models/auth/authentication-response.interface";
import {TokenService} from "../../../../service/token.service";

@Component({
  selector: 'app-refresh-token',
  templateUrl: './refresh-token.component.html',
  styleUrls: ['./refresh-token.component.scss']
})
export class RefreshTokenComponent implements OnInit{
  response:AuthenticationResponse| undefined;
  constructor(private auth:AuthenticationService,
              private tokenService:TokenService) {
  }
  ngOnInit(): void {
    this.refreshToken();
  }

  public refreshToken(){
    this.auth.refreshToken().subscribe({
      next: (data) => {
        this.tokenService.setAccessToken(data.accessToken);
        this.tokenService.setRefreshToken(data.refreshToken);
        this.response = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
