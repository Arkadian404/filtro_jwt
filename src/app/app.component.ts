import {ChangeDetectionStrategy, Component, DoCheck, HostListener, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'jwt-ng-client';

  constructor() {
    // localStorage.clear();
  }

}
