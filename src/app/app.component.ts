import {ChangeDetectionStrategy, Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "./service/token.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'jwt-ng-client';

  constructor() {

  }




}
