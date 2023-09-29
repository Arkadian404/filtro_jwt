import {Component, DoCheck, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {User} from "../../../../shared/models/user";
import {TokenService} from "../../../../service/token.service";


@Component({
  selector: 'app-security',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  slidesPerView = 5;
  screenWidth: number;
  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth>= 320 && this.screenWidth<=480) {
      this.slidesPerView = 1;
    } else if (this.screenWidth < 992) {
      this.slidesPerView = 2.5;
    } else if (this.screenWidth < 1200) {
      this.slidesPerView = 3.5;
    } else if (this.screenWidth< 1600) {
      this.slidesPerView = 4;
    }
  }

  constructor(private jwtService: AuthenticationService,
              private tokenService:TokenService) {
  }

  ngOnInit(){
  }



}
