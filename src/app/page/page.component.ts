import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../service/token.service";
import {AuthenticationService} from "../service/authentication.service";
import {UtilService} from "../service/util.service";
import {Router} from "@angular/router";
import {SharedLoginUserNameService} from "../service/SharedLoginUserNameService";
import {Cart} from "../shared/models/cart";
import {CartItemService} from "../service/cart-item.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit{

  isLoggedIn = false;
  username = '';
  cart: Cart;


  constructor(public tokenService:TokenService,
              private authService: AuthenticationService,
              private utilService:UtilService,
              private router:Router,
              private shareLoginUserNameService: SharedLoginUserNameService,
              private cartItemService: CartItemService,) {
  }

  ngOnInit(): void {
      this.isLoggedIn = true;
      this.username = this.tokenService.getUsername();
      this.shareLoginUserNameService.setLoginUserNameData(this.username);
      this.getCart();

    // this.cartItemService.convertListCartItemAfterLogin();
  }



  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.tokenService.clearToken();
        this.username =null;
        this.utilService.openSnackBar('Đăng xuất thành công', 'Đóng');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        this.utilService.openSnackBar(err, 'Đóng');
      }
    });
  }

  getCart(){
    return this.cartItemService.getCart(this.tokenService.getUsername())
      .subscribe({
        next:(data) => {
          this.cart = data;
          // this.shareLoginUserNameService.setCart(this.cart);
          localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

}
