import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input()
  name?: string;

  @Output()
  onToggleSideNav: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onLogout = new EventEmitter<any>();
  toggleSideNav(){
    this.onToggleSideNav.emit();
  }

  toggleLogout(){
    this.onLogout.emit();
  }

}
