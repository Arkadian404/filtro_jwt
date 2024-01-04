import {Component, OnInit} from '@angular/core';
import {WishlistItemService} from "../../../../service/wishlist-item.service";
import {UtilService} from "../../../../service/util.service";
import {TokenService} from "../../../../service/token.service";
import {WishlistItemDto} from "../../../../shared/dto/wishlist-item-dto";
import {switchMap} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CartItemService} from "../../../../service/cart-item.service";
import {ProductDto} from "../../../../shared/dto/product-dto";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {UserDialogService} from "../reusable/user-dialog.service";


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  isLoading = true;
  wishlistItems:WishlistItemDto[] = [];
  username:string = this.tokenService.getUsername();
  cartItemForm: FormGroup;
  wishlistItemForm: FormGroup;
  selectedProduct: ProductDto;
  constructor(private wishlistService:WishlistItemService,
              private tokenService:TokenService,
              private cartItemService:CartItemService,
              private wishlistItemService:WishlistItemService,
              private formBuilder:FormBuilder,
              private dialogService:UserDialogService,
              private utilService:UtilService) {
  }

  ngOnInit(): void {
    this.cartItemForm = this.formBuilder.group({
      quantity: [1]
    });
    this.wishlistItemForm = this.formBuilder.group({
      product:[null]
    });
    this.getWishlistItems();
  }

  getWishlistItems(){
    if(this.username){
      this.wishlistService.getWishlist(this.username).pipe(
        switchMap(wl=> {
          return this.wishlistService.getWishlistItems(wl.id)
        })
      ).subscribe({
        next: wishlistItems => {
          this.wishlistItems = wishlistItems;
          this.isLoading = false;
          console.log(wishlistItems);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }else{
      this.wishlistItems = this.wishlistItemService.getWishlistItemsFromLocalStorage();
      this.isLoading = false;
    }

  }

  addCartItemToCart(cartItem:CartItemDto){
    this.cartItemService.addCartItemToCart(cartItem).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, "Đóng");
        this.cartItemService.addCartItemsBehavior.next(cartItem);
      },
      error:(err)=>{
        this.utilService.openSnackBar(err, "Đóng");
      }
    })
  }

  addCart(event:ProductDto){
    this.selectedProduct = event;
    if(this.cartItemForm.valid){
      this.cartItemForm.value.productName = this.selectedProduct.name;
      this.cartItemForm.value.slug = this.selectedProduct.slug;
      this.cartItemForm.value.productDetail =this.selectedProduct.productDetails[0];
      this.cartItemForm.value.productImage =  this.selectedProduct.images[0];
      this.cartItemForm.value.price = this.selectedProduct.productDetails[0].price;
      this.cartItemForm.value.total = this.cartItemForm.value.quantity * this.cartItemForm.value.price;
    }
    console.log(this.cartItemForm.value)
    if(!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null){
      this.cartItemService.addToCartNotLogin(this.cartItemForm.value);
    }else{
      this.cartItemService.getCart(this.tokenService.getUsername()).subscribe({
        next:(data)=>{
          this.cartItemForm.value.cart = data;
          this.addCartItemToCart(this.cartItemForm.value);
        }
      });
    }
  }


  deleteWishlist(productId:number){
    const wishlistItem = this.wishlistItems.find(item=>item.product.id === productId);
    if(this.username){
      this.wishlistItemService.deleteWithLogin(wishlistItem?.id).subscribe({
        next:(data)=>{
          this.utilService.openSnackBar(data.message, "Đóng");
          this.wishlistItemService.deleteWishlistItemsBehavior.next(productId);
          this.getWishlistItems();
          console.log(this.wishlistItems);
        },
        error:(err)=>{
          this.utilService.openSnackBar(err, "Đóng");
          console.log(err);
        }
      });

    }else{
      if(this.wishlistItemForm.valid){
        this.wishlistItemForm.value.product = this.selectedProduct;
      }
      this.wishlistItemService.deleteWishlistItemNotLogin(productId);
      this.getWishlistItems();
    }
  }

  openDeleteWishlistItem(productId:number){
    this.dialogService.confirmDialog("Xóa sản phẩm", "Bạn có chắc muốn xóa sản phẩm khỏi danh sách yêu thích?").subscribe(res=>{
      if(productId !=null){
        this.deleteWishlist(productId);
      }
    });
  }
}
