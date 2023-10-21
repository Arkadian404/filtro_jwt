import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../service/token.service";
import {AuthenticationService} from "../service/authentication.service";
import {UtilService} from "../service/util.service";
import {Router} from "@angular/router";
import {SharedLoginUserNameService} from "../service/SharedLoginUserNameService";
import {Cart} from "../shared/models/cart";
import {CartItemService} from "../service/cart-item.service";
import {Observable} from "rxjs";
import {ProductDetail} from "../shared/models/product/product-detail";
import {ProductDetailService} from "../service/product-detail.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit{

  isLoggedIn = false;
  username = '';
  cart: Cart;
  sampleProductDetail: ProductDetail;

  constructor(public tokenService:TokenService,
              private authService: AuthenticationService,
              private utilService:UtilService,
              private router:Router,
              private shareLoginUserNameService: SharedLoginUserNameService,
              private cartItemService: CartItemService,
              private productDetailService: ProductDetailService, ) {
  }

  ngOnInit(): void {
      this.isLoggedIn = true;
      this.username = this.tokenService.getUsername();
      console.log("username trong page component: ", this.username);
      this.getSampleProductDetail();
      // this.shareLoginUserNameService.setLoginUserNameData(this.username);
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
          console.log("cart trong page component: ", this.cart);
          console.log("username trong page component", this.username);
          // this.shareLoginUserNameService.setCart(this.cart);
          localStorage.setItem('cart', JSON.stringify(this.cart));
          localStorage.setItem('username', JSON.stringify(this.username));
          localStorage.setItem('sampleProductDetail', JSON.stringify(this.sampleProductDetail));
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  getSampleProductDetail(){
    return this.productDetailService.getById(1)
      .subscribe(({
        next:(data) =>{
          this.sampleProductDetail = data;
          console.log("sample product Detail: ", this.sampleProductDetail);
        },
        error: (err) => {
          console.log(err)
        }
      }))
  }
}
