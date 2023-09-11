import {Component, DoCheck} from '@angular/core';
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements DoCheck{

  isLoggedIn = false;

  constructor(private tokenService:TokenService) {
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
  }

}
