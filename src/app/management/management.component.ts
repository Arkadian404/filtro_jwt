import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit{

  response:any;
  constructor(private jwtService: AuthenticationService,
              private tokenService:TokenService){

  }
  ngOnInit(): void {
    this.getManagementAccess();
  }

  public getManagementAccess(){
    let resp = this.jwtService.managementAccess();
    resp.subscribe(data => {
      console.log(data);
      this.response = data;
    });
  }


}
