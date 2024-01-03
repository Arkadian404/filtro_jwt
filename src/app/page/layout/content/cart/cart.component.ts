import {Component, Input, OnInit} from '@angular/core';
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {UtilService} from "../../../../service/util.service";

import {TokenService} from "../../../../service/token.service";
import {MatDialog} from "@angular/material/dialog";
import {UserDialogService} from "../reusable/user-dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {OrderDto} from "../../../../shared/dto/order-dto";
import {OrderDetailModalComponent} from "../orders/order-detail-modal/order-detail-modal.component";
import {UserConfirmationDialogComponent} from "../reusable/user-confirmation-dialog/user-confirmation-dialog.component";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  username: string;
  isLoading: boolean = true;
  cartItems: CartItemDto[];
  selectedCartItem:CartItemDto;
  currentQuantity: number;
  subTotal: number= 0;
  totalSum: number = 0;
  constructor(private cartItemService: CartItemService,
              private tokenService: TokenService,
              private dialog:MatDialog,
              private dialogService:UserDialogService,
              private utilService:UtilService) {
  }
  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
    this.getCartItemList();
  }

  getCartItemList(){
    if(this.username){
      return this.cartItemService.getCart(this.username).subscribe({
        next:(data) =>{
          this.cartItemService.getCartItems(data.id).subscribe(items=>{
            this.cartItems = items;
            console.log(items)
            this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
            this.totalSum = this.subTotal;
            this.isLoading = false;
          });
        },
        error: (err) => {
          console.log(err)
          this.isLoading = false;
        }
      })
    }else{
      this.cartItems = this.cartItemService.getCartItemsFromLocalStorage();
      this.isLoading = false;
      console.log(this.cartItems)
      this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
      this.totalSum = this.subTotal;
      return this.cartItems ? this.cartItems : [];
    }
  }

  incrementQuantity(item: CartItemDto): void {
    item.quantity += 1;
    item.total = item.quantity * item.price;
    this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
    this.totalSum = this.subTotal;
    this.cartItemService.saveCartItemsFromLocalStorage(this.cartItems);
    this.cartItemService.addCartItemsBehavior.next(item);
  }

  decrementQuantity(item: CartItemDto): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.total = item.quantity * item.price;
      this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
      this.totalSum = this.subTotal;
      this.cartItemService.saveCartItemsFromLocalStorage(this.cartItems);
      this.cartItemService.deleteCartItemsBehavior.next(item.id);
    }
  }

  updateCartItemQuantity(id:number, amount:number){
    const currentQuantity = this.selectedCartItem.quantity;
    if(amount> 0){
      this.cartItemService.addCartItemsBehavior.next(this.selectedCartItem);
    }else{
      this.cartItemService.deleteCartItemsBehavior.next(this.selectedCartItem.id);
    }
    if(currentQuantity + amount > 0){
        this.cartItemService.updateCartItemQuantity(id, amount).subscribe({
        next:(data)=>{
          this.utilService.openSnackBar(data.message, 'Đóng');
          this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
          this.getCartItemList();
        },
        error:(err)=>{
          this.utilService.openSnackBar(err.error.message, 'Đóng');
        }
      })
    }
  }

  getCartItems(){
    this.cartItemService.getCart(this.username).subscribe(cart=>{
      this.cartItemService.getCartItems(cart.id).subscribe(items=>{
        if(items.length>0) {
          this.cartItems = items;
          this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
          this.totalSum = this.subTotal;
        }else{
          this.cartItems = [];
          this.subTotal = 0;
          this.totalSum = 0;
        }
      })
    })
  }

  deleteCartItem(event: any){
    if (this.username){
      return this.cartItemService.deleteWithLogin(event.id)
        .subscribe({
          next:(data) =>{
            this.utilService.openSnackBar(data.message, 'Đóng');
            this.getCartItems();
          },
          error: (err) => {
            console.log(err)
          }
        });
    } else {
      this.cartItemService.deleteWithoutLogin(event.productDetail.id);
      this.getCartItemList();
      return this.getCartItemList() ? this.getCartItemList() : [];
    }
  }

  openDeleteCartItemDialog(data:CartItemDto){
    this.dialogService.confirmDialog("Xóa sản phẩm", "Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?").subscribe(res=>{
      if(data !=null){
        this.deleteCartItem(data);
      }
    });
  }
}
