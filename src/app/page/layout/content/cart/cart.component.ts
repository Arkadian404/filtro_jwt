import {Component, Input, OnInit} from '@angular/core';
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {UtilService} from "../../../../service/util.service";

import {TokenService} from "../../../../service/token.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  username: string;
  // dataSource!: MatTableDataSource<CartItemListAPIResponse>;

  cartItems: CartItemDto[];
  selectedCartItem:CartItemDto;
  subTotal: number= 0;
  totalSum: number = 0;
  constructor(private cartItemService: CartItemService,
              private tokenService: TokenService,
              private utilService:UtilService) {
  }
  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
    console.log("user name: ", this.username);
    console.log(this.username==null)
    this.getCartItemList();
  }

  getCartItemList(){
    if(this.username){
      return this.cartItemService.getCart(this.username).subscribe({
        next:(data) =>{
          this.cartItemService.getCartItems(data.id).subscribe(items=>{
            this.cartItems = items;
            this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
            this.totalSum = this.subTotal + 10;
          })
        }
      })
    }else{
      this.cartItems = this.cartItemService.getCartItemsFromLocalStorage();
      console.log(this.cartItems)
      this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
      this.totalSum = this.subTotal + 10;
      return this.cartItems ? this.cartItems : [];
    }
  }

  incrementQuantity(item: CartItemDto): void {
    item.quantity += 1;
    item.total = item.quantity * item.price;
    this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
    this.totalSum = this.subTotal + 10;
    this.cartItemService.saveCartItemsFromLocalStorage(this.cartItems);
    this.cartItemService.addCartItemsBehavior.next(item);
  }

  decrementQuantity(item: CartItemDto): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.total = item.quantity * item.price;
      this.subTotal = this.cartItems.reduce((sum, item) => sum + item.total, 0);
      this.totalSum = this.subTotal + 10;
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

  deleteCartItem(event: any){
    if (this.username){
      return this.cartItemService.deleteWithLogin(event.id)
        .subscribe({
          next:(data) =>{
            this.utilService.openSnackBar(data.message, 'Đóng');
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
}
