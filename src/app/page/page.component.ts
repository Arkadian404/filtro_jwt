import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, DoCheck{

  isLoggedIn = false;
  username = '';

  constructor(private tokenService:TokenService) {
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
  }

  ngOnInit(): void {
    if(this.tokenService.isLoggedIn()){
      this.isLoggedIn = true;
      this.username = this.tokenService.getUsername();
    }
  }

}
