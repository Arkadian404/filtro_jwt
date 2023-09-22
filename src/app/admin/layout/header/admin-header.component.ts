import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
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
