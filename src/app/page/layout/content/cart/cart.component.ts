import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {CartItem} from "../../../../shared/models/cart-item";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemListAPIResponseService} from "../../../../service/response/CartItemListAPIResponse.service";

import {DataSource} from "@angular/cdk/collections";
import {CartItemListAPIResponse} from "../../../../shared/models/response/CartItemListAPIResponse";
import {SharedLoginUserNameService} from "../../../../service/SharedLoginUserNameService";
import {AuthenticationService} from "../../../../service/authentication.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {UtilService} from "../../../../service/util.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  username: string;
  // dataSource!: MatTableDataSource<CartItemListAPIResponse>;

  cartItems: any[];
  cartItemList: any[];
  productImages: any[];
  cartItemListAPIResponse: CartItemListAPIResponse;
  subTotal: number= 0;
  totalSum: number = 0;
  constructor(private cartItemListAPIResponseService: CartItemListAPIResponseService,
              private cartItemService: CartItemService,
              private shareLoginUserNameService: SharedLoginUserNameService,
              private authenticationService: AuthenticationService,
              private utilService:UtilService) {
  }
  ngOnInit(): void {
    this.username = this.authenticationService.getUserNameFromLocalStorage();
    console.log("user name: ", this.username);
    this.getCartItemList();
  }

  getCartItemList(){
    if (this.username){
      return this.cartItemListAPIResponseService.getCartItemList()
        .subscribe({
          next:(data) =>{
            console.log("cart item khi login: ", data);
            this.cartItemListAPIResponse = data;
            this.cartItems = data.cartItemList;
            this.productImages = data.productImages;
            // Assign the sum to a component property
            this.subTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            this.totalSum = this.subTotal + 10;
          },
          error: (err) => {
            console.log(err)
          }
        });
    }
    else {
      this.cartItems =  this.cartItemService.getCartItemsFromLocalStorage();
      this.productImages = this.cartItemService.getProductImagesFromLocalStorage();
      console.log("cartitem chua login",  this.cartItems);
      console.log("productImage chua login",  this.productImages);
      // Assign the sum to a component property
      this.subTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      this.totalSum = this.subTotal + 10;
      return null;
    }
  }
  incrementQuantity(item: CartItem): void {
    item.quantity += 1;
    this.subTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.totalSum = this.subTotal + 10;
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.subTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);;
      this.totalSum = this.subTotal + 10;
    }
  }

  deleteCartItem(itemId: number){
    if (this.username){
      return this.cartItemService.deleteWithLogin(itemId)
        .subscribe({
          next:(data) =>{
            this.utilService.openSnackBar('Xóa CartItem thành công', 'Đóng');
            this.getCartItemList();
          },
          error: (err) => {
            console.log(err)
          }
        });
    } else {
      console.log("Xoa cartitem chua login: ", itemId);
      this.cartItemService.deleteWithoutLogin(itemId);
      this.getCartItemList();
      // Assign the sum to a component property

      return null;
    }

  }
}