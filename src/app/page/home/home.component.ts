import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {User} from "../../shared/models/user";
import {TokenService} from "../../service/token.service";


@Component({
  selector: 'app-security',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  // @ts-ignore
  user:User;
  errorMessage:string = "";
  isLogged:boolean = false;


  constructor(private jwtService: AuthenticationService,
              private tokenService:TokenService) {
  }

  ngOnInit(){
    this.getCurrentUserAccess();
    this.isLogged = this.tokenService.isLoggedIn();
  }


  public getCurrentUserAccess(){
    let resp = this.jwtService.currentUserAccess();
    resp.subscribe({
      next: (data) => {
        console.log(data);
        this.user = data
      },
      error: err => {
        console.log(err);
        this.errorMessage = err
      }
    });
  }
}
