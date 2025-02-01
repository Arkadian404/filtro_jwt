import {AfterViewInit, Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from "../../../../service/product/search.service";
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../../../../shared/dto/product-dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenService} from "../../../../service/token.service";
import {UtilService} from "../../../../service/util.service";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {WishlistItemService} from "../../../../service/wishlist-item.service";
import {WishlistItemDto} from "../../../../shared/dto/wishlist-item-dto";
import {CartResponse} from "../../../../shared/response/cart-response";
import {WishlistItemRequest} from "../../../../shared/request/wishlist-item-request";
import {ProductResponse} from "../../../../shared/response/product-response";
import {WishlistItemResponse} from "../../../../shared/response/wishlist-item-response";
import {CartItemRequest} from "../../../../shared/request/cart-item-request";
import {CartItemResponse} from "../../../../shared/response/cart-item-response";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  isLoading = true;
  searchValue = '';
  products:ProductResponse[] = []
  product:ProductResponse;
  form:FormGroup;
  wishlistItemForm:FormGroup;
  wishlistItems: WishlistItemRequest[] = [];
  wishlistItemResponse: WishlistItemResponse[] = [];
  isWishlist: number[] = [];
  private wishlistItemRequest: WishlistItemRequest = {};
  private cartItemRequest: CartItemRequest = {};
  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly cartItemService:CartItemService,
              private readonly utilService:UtilService,
              private readonly tokenService:TokenService,
              private readonly formBuilder:FormBuilder,
              private readonly wishlistItemService:WishlistItemService,
              private readonly searchService:SearchService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      quantity: 1,
    });
    this.wishlistItemForm = this.formBuilder.group({})
    this.searchService.searchResults$.subscribe({
        next: data=> {
          this.searchValue = data;
          if(this.searchValue !== this.activatedRoute.snapshot.queryParams.query){
            this.getSearchResult(this.searchValue);
          }
        },
        error: err=> {
          console.log(err)
        }
      });
      this.searchValue = this.activatedRoute.snapshot.queryParams.query;
      this.getSearchResult(this.searchValue);
    }
    getSearchResult(searchValue:string){
      this.searchService.getSearchResult(searchValue).subscribe({
        next: data=> {
          this.products = data;
          this.isLoading = false;
          const items = this.wishlistItemService.getWishlistItemsFromLocalStorage();
          if (this.tokenService.getUsername()){
            this.wishlistItemService.getWishlist().subscribe(wishlist=>{
              this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(wishlistItems=>{
                this.getWishlistItems();
                this.isWishlist = wishlistItems.map(item=>item.product.id);
              });
            });
          }else if (items.length > 0) {
            this.isWishlist = items.map(item => item.product.id);
            this.wishlistItemService.wishlistItemsBehavior.next(items);
          } else {
            this.wishlistItemService.wishlistItemsBehavior.next([]);
          }
        },
        error: err=> {
          this.products = [];
          console.log(err)
          this.isLoading = false;
      }
     })
  }

  mapCartToRequest(cart: CartItemResponse): CartItemRequest{
    this.cartItemRequest.cartId = cart.cart.id;
    this.cartItemRequest.productDetailId = cart.productDetail.id;
    this.cartItemRequest.price = cart.productDetail.price;
    this.cartItemRequest.quantity = cart.quantity;
    this.cartItemRequest.total = cart.total;
    return this.cartItemRequest;
  }

  addToCart(event:ProductResponse){
    this.product = event;
    if(this.form.valid){
      this.form.value.prductName = this.product.name;
      this.form.value.slug = this.product.slug;
      this.form.value.productDetail =this.product.productDetails[0];
      this.form.value.productImage = this.product.images[0];
      this.form.value.price = this.product.productDetails[0].price;
      this.form.value.total = this.form .value.quantity * this.form.value.price;
    }
    console.log(this.form.value)
    if(!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null){
      this.cartItemService.addToCartNotLogin(this.form .value);
    }else{
      this.cartItemService.getCart(this.tokenService.getUsername()).subscribe({
        next:(data)=>{
          this.form.value.cart = data;
          this.cartItemRequest = this.mapCartToRequest(this.form .value);
          console.log(this.cartItemRequest);
          this.addCartItemToCart(this.cartItemRequest);
        }
      })
    }
  }


  addCartItemToCart(cartItem: CartItemRequest){
    this.cartItemService.addCartItemToCart(cartItem).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data, "Đóng");
        this.cartItemService.addCartItemsBehavior.next(cartItem);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  getWishlistItems(){
    this.wishlistItemService.getWishlist().subscribe(wishlist=>{
      this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
        this.wishlistItemResponse = items;
      })
    })
  }
  mapWishlistItemRequest(wishlistItem: WishlistItemResponse): WishlistItemRequest{
    this.wishlistItemRequest.wishlistId = wishlistItem.wishlist.id;
    this.wishlistItemRequest.productId = wishlistItem.product.id;
    return this.wishlistItemRequest;
  }

  handleWishlist(event:ProductResponse){
    this.product = event;
    if(this.wishlistItemForm.valid){
      this.wishlistItemForm.value.product = this.product;
    }
    if (!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null) {
      if(this.checkExist(this.isWishlist, this.product)){
        this.isWishlist = this.isWishlist.filter(item => item !== this.product.id);
      }else{
        this.isWishlist.push(this.product.id);
      }
      this.wishlistItemService.handleWishlistNotLogin(this.wishlistItemForm.value);
    }else{
      this.wishlistItemService.getWishlist().subscribe(wishlist=>{
        this.wishlistItemForm.value.wishlist = wishlist;
        this.wishlistItemRequest = this.mapWishlistItemRequest(this.wishlistItemForm.value);
        if(this.checkExist(this.isWishlist, this.product)){
          this.deleteFromWishlist(this.product.id);
        }else{
          this.addToWishlist(this.wishlistItemRequest, this.wishlistItemForm.value);
        }
      })
    }
  }

  addToWishlist(wishlistItem: WishlistItemRequest, wishlistItemForm: WishlistItemResponse){
    this.wishlistItemService.addWishlistItemToWishlist(wishlistItem).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data, "Đóng");
        this.wishlistItemService.addWishlistItemsBehavior.next(wishlistItemForm);
        this.isWishlist.push(wishlistItem.productId);
        this.getWishlistItems();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  deleteFromWishlist(productId:number){
    const wishlistItem = this.wishlistItemResponse.find(item=>item.product.id === productId);
    console.log(wishlistItem);
    console.log(productId);
    console.log(this.wishlistItems);
    this.wishlistItemService.deleteWithLogin(wishlistItem?.id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data, "Đóng");
        this.wishlistItemService.deleteWishlistItemsBehavior.next(productId);
        const index = this.isWishlist.findIndex(item => item === productId);
        this.isWishlist.splice(index,1);
        this.getWishlistItems();
        console.log(this.wishlistItems);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }



  checkExist(isWishlist: number[], product: ProductResponse): boolean {
    return !!isWishlist.find(item => item === product.id);
  }





}
