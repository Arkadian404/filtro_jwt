import {Component, Input, ViewEncapsulation} from '@angular/core';
import {
  faDashboard,
  faLocation,
  faShop,
  faMoneyBill,
  faContactBook
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() isEmployee = false;
  faCoffee = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faMoneyBill = faMoneyBill;
  faContactBook = faContactBook;
}
