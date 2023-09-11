import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {TokenService} from "../service/token.service";
import {User} from "../shared/models/user";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  // @ts-ignore
  response:User;
  sideNavOpen = true;

  constructor(private jwtService: AuthenticationService,
              private tokenService:TokenService){
  }

  ngOnInit(){
    this.getAdmin();
  }

  sideNavToggle(){
    this.sideNavOpen = !this.sideNavOpen;
  }

  public getAdmin() {
    let resp = this.jwtService
      .adminAccess()
  //     .pipe(
  //       filter(data => {
  //         return Date.now() > tokenExp;
  //       }),
  //       concatMap(() => this.jwtService.refreshToken()),
  //       tap(data => this.tokenService.setAccessToken(data.accessToken))
  // );
    resp.subscribe(data => {
      console.log(data);
      this.response = data
    });
  }

}
