import {Component, Input, OnInit} from '@angular/core';
import {CartItemService} from "../../../../service/cart-item.service";
import {UtilService} from "../../../../service/util.service";

import {TokenService} from "../../../../service/token.service";
import {UserDialogService} from "../reusable/user-dialog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VoucherService} from "../../../../service/voucher.service";
import {VoucherResponse} from "../../../../shared/response/voucher-response";
import {CartItemResponse} from "../../../../shared/response/cart-item-response";
import {CartResponse} from "../../../../shared/response/cart-response";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  username: string;
  isLoading = true;
  cartItems: CartItemResponse[];
  selectedCartItem:CartItemResponse;
  subTotal= 0;
  subTotalDiscount= 0;
  totalSum = 0;
  voucherForm: FormGroup<any>;
  voucher:VoucherResponse;
  constructor(private readonly cartItemService: CartItemService,
              private readonly tokenService: TokenService,
              private readonly formBuilder: FormBuilder,
              private readonly dialogService:UserDialogService,
              private readonly voucherService:VoucherService,
              private readonly utilService:UtilService) {
  }
  ngOnInit(): void {
    this.voucherForm = this.formBuilder.group({
      code:['', Validators.required]
    });
    this.username = this.tokenService.getUsername();
    this.getCartItemList();
  }

  getCartItemList(){
    if(this.username){
      return this.cartItemService.getCart(this.username).subscribe({
        next:(data) =>{
          console.log(data);
          this.voucher = data.voucher;
          this.cartItemService.getCartItems(data.id).subscribe(items=>{
            this.cartItems = items;
            console.log(this.cartItems);
            if(this.voucher){
              if(this.voucher?.category!=null){
                this.subTotalDiscount = this.cartItems.filter(item => item.productDetail.categoryId === this.voucher?.category?.id).reduce((sum, item) => sum + item.total, 0);
              }else{
                this.subTotalDiscount = this.cartItems.reduce((sum, item) => sum + item.total, 0);
              }
            }
            this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
            this.totalSum = this.subTotal;
            this.isLoading = false;
            console.log(this.subTotalDiscount);
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

  incrementQuantity(item: CartItemResponse): void {
    item.quantity += 1;
    item.total = item.quantity * item.price;
    this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
    this.totalSum = this.subTotal;
    this.cartItemService.saveCartItemsFromLocalStorage(this.cartItems);
    this.cartItemService.addCartItemsBehavior.next(item);
  }

  decrementQuantity(item: CartItemResponse): void {
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
          this.utilService.openSnackBar(data, 'Đóng');
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
            this.utilService.openSnackBar(data, 'Đóng');
            this.getCartItemList();
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

  openDeleteCartItemDialog(data:CartResponse){
    this.dialogService.confirmDialog("Xóa sản phẩm", "Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?").subscribe(res=>{
      if(data !=null){
        this.deleteCartItem(data);
      }
    });
  }

  applyVoucher(){
    if(this.voucherForm.valid) {
      this.voucherService.applyVoucher(this.voucherForm.value.code).subscribe({
        next: (data) => {
          this.utilService.openSnackBar(data, 'Đóng');
          this.getCartItemList();
        },
        error: (err) => {
          this.utilService.openSnackBar(err, 'Đóng');
        }
      });
      console.log(this.voucherForm.value);
    }
  }

  removeVoucher(id:number){
    this.voucherService.removeVoucher(id).subscribe({
      next: (data) => {
        this.utilService.openSnackBar(data, 'Đóng');
        this.getCartItemList();
      },
      error: (err) => {
        this.utilService.openSnackBar(err, 'Đóng');
      }
    });
  }

  openChangeVoucher(data:VoucherResponse){
    this.dialogService.confirmDialog("Thay đổi voucher", "Bạn có chắc muốn đổi voucher hiện tại?").subscribe(res=>{
      if(data !=null){
        this.removeVoucher(data.id);
      }
    });
  }

}
