import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../service/token.service";
import {AuthenticationService} from "../service/user/authentication.service";
import {UtilService} from "../service/util.service";
import {Router} from "@angular/router";
import {Cart} from "../shared/models/cart";
import {CartItemService} from "../service/cart-item.service";
import {ProductDetail} from "../shared/models/product/product-detail";
import {CartItemDto} from "../shared/dto/cart-item-dto";
import {WishlistItemService} from "../service/wishlist-item.service";


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit{

  isLoggedIn = false;
  username = '';
  amountOfCartItem = 0;
  cartItems: CartItemDto[] = [];
  sampleProductDetail: ProductDetail;

  constructor(public tokenService:TokenService,
              private authService: AuthenticationService,
              private utilService:UtilService,
              private router:Router,
              private cartItemService: CartItemService,
              private wishlistItemService: WishlistItemService) {
  }

  ngOnInit(): void {
      this.isLoggedIn = true;
      this.username = this.tokenService.getUsername();
  }


  navigateToUser(){
    this.router.navigate(['/user-info']);
  }

  navigateToOrders(){
    this.router.navigate(['/orders']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.tokenService.clearToken();
        this.username = null;
        this.cartItemService.cartItemsBehavior.next([]);
        this.wishlistItemService.wishlistItemsBehavior.next([]);
        this.utilService.openSnackBar('Đăng xuất thành công', 'Đóng');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.utilService.openSnackBar(err, 'Đóng');
      }
    });
  }
}
