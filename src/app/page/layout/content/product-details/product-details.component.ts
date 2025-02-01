import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ProductService} from "../../../../service/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductImageDto} from "../../../../shared/dto/product-image-dto";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCheckSquare, faSquare} from "@fortawesome/free-regular-svg-icons";
import {faGithub, faMedium, faStackOverflow} from "@fortawesome/free-brands-svg-icons";
import {faCartShopping, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ProductDetailDto} from "../../../../shared/dto/product-detail-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../../../shared/dto/user-dto";
import {TokenService} from "../../../../service/token.service";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {CartItemService} from "../../../../service/cart-item.service";
import {UtilService} from "../../../../service/util.service";
import {WishlistItemDto} from "../../../../shared/dto/wishlist-item-dto";
import {WishlistItemService} from "../../../../service/wishlist-item.service";
import {Voucher} from "../../../../shared/models/voucher";
import {VoucherService} from "../../../../service/voucher.service";
import {CartResponse} from "../../../../shared/response/cart-response";
import {ProductResponse} from "../../../../shared/response/product-response";
import {WishlistItemResponse} from "../../../../shared/response/wishlist-item-response";
import {WishlistItemRequest} from "../../../../shared/request/wishlist-item-request";
import {CartItemRequest} from "../../../../shared/request/cart-item-request";
import {CartItemResponse} from "../../../../shared/response/cart-item-response";
import {VoucherResponse} from "../../../../shared/response/voucher-response";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product:ProductResponse;
  relatedProducts:ProductResponse[]=[];
  user:UserDto;
  productDetail:ProductDetailDto;
  productDetails:ProductDetailDto[];
  selectedProductDetailId = 1;
  selectedQuantity = 1;
  selectedImage= '';
  productImages:ProductImageDto[] = [];
  isLoading = true;
  form:FormGroup;
  wishlistItemForm:FormGroup;
  wishlistItems:WishlistItemResponse[] = [];
  wishlistItem:WishlistItemDto;
  isWishlist:number[] = [];
  slidesPerView=5;
  screenWidth:number;
  availableVouchersByProductId: VoucherResponse[] = [];
  availableVouchersToAll: VoucherResponse[] = [];
  private wishlistItemRequest: WishlistItemRequest = {};
  private cartItemRequest: CartItemRequest = {};

  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth<=576) {
      this.slidesPerView = 1;
    } else if(this.screenWidth < 768) {
      this.slidesPerView = 3;
    }
    else if (this.screenWidth < 992) {
      this.slidesPerView = 4;
    } else{
      this.slidesPerView = 5;
    }
  }


  constructor(private readonly productService:ProductService,
              private readonly formBuilder:FormBuilder,
              private readonly authService:AuthenticationService,
              private readonly tokenService:TokenService,
              private readonly activatedRoute:ActivatedRoute,
              private readonly cartItemService:CartItemService,
              private readonly wishlistItemService:WishlistItemService,
              private readonly voucherService: VoucherService,
              private readonly utilService:UtilService,
              library: FaIconLibrary) {
    library.addIcons(
      faSquare,
      faCartShopping,
      faCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium,
      faMinus,
      faPlus
    );
  }

  ngOnInit(): void {
    this.getUser();
    this.form = this.formBuilder.group({
      quantity:[1, [Validators.min(1), Validators.required]],
    })
    this.wishlistItemForm = this.formBuilder.group({})
    this.activatedRoute.params.subscribe({
      next: params => {
        console.log(params);
        if(params['slug']){
          this.getProduct(params['slug']);
        }
      }
    })
  }

  getAvailableVouchersByProductId(productId:number){
    return this.voucherService.getAvailableVoucherByProductId(productId).subscribe({
      next: data => {
        this.availableVouchersByProductId = data;
        console.log(this.availableVouchersByProductId);
      },
      error: err => {
        console.log(err);
      }
    })
  }


  getAvailableVoucherToAllProducts(){
    return this.voucherService.getAvailableVoucherToAllProducts().subscribe({
      next: data => {
        this.availableVouchersToAll = data;
        console.log(this.availableVouchersByProductId);
      },
      error: err => {
        console.log(err);
      }
    })
  }


  getProduct(slug:string){
    this.productService.getProductDtoBySlug(slug).subscribe({
      next: data => {
        this.product = data;
        this.productImages = data.images;
        this.selectedProductDetailId = data.productDetails[0].id;
        this.productDetail = data.productDetails[0];
        this.selectedImage = data.images[0].url;
        this.productDetails = data.productDetails;
        this.getRelatedProducts(data.id, data.flavor.id);
        this.getAvailableVouchersByProductId(data.id);
        this.getAvailableVoucherToAllProducts();
        this.isLoading = false;
      },
      error: err => {
        console.log(err);
        this.isLoading = false;
      },
    })
  }

  onRadioChange(event:any){
    this.selectedProductDetailId = event.target.value;
    this.productDetail =  this.productDetails
      .find(productDetail => productDetail.id == this.selectedProductDetailId);
    console.log(this.productDetail);
    console.log(event.target.value);
  }

  increaseQuantity(){
    this.selectedQuantity++;
  }

  decreaseQuantity(){
    if(this.selectedQuantity > 1){
      this.selectedQuantity--;
    }
  }

  onImageChange(event:any){
    console.log(event.target)
    this.selectedImage = event.target.src;
  }

  addCartItemToCart(cartItem: CartResponse){
    this.cartItemService.addCartItemToCart(cartItem).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data, "Đóng");
        this.cartItemService.addCartItemsBehavior.next(cartItem);
      },
      error:(err)=>{
        console.log(err);
        this.utilService.openSnackBar(err, "Đóng");
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
      this.form.value.total = this.form.value.quantity * this.form.value.price;
    }
    console.log(this.form.value)
    if(!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null){
      this.cartItemService.addToCartNotLogin(this.form.value);
    }else{
      this.cartItemService.getCart(this.tokenService.getUsername()).subscribe({
        next:(data)=>{
          this.form.value.cart = data;
          this.cartItemRequest = this.mapCartToRequest(this.form.value);
          console.log(this.cartItemRequest);
          this.addCartItemToCart(this.cartItemRequest);
        }
      })
    }
  }

  getUser(){
    if(this.tokenService.isLoggedIn()){
      this.authService.currentUserAccess().subscribe({
        next: data => {
          this.user = data;
          console.log(this.user);
        },
        error: err => {
          console.log(err);
        }
      })
    }

  }

  getRelatedProducts(id:number, flavorId:number){
    this.productService.getTop10RelatedProductsByFlavor(id, flavorId).subscribe({
      next: data => {
        this.relatedProducts = data;
        const items = this.wishlistItemService.getWishlistItemsFromLocalStorage();
        if(this.tokenService.getUsername()){
          this.wishlistItemService.getWishlist().subscribe(wishlist=>{
            this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
              this.wishlistItems = items;
              this.isWishlist = items.map(item=>item.product.id);
              this.wishlistItems.forEach(item=>{
                this.wishlistItemService.wishlistItemsBehavior.next([...this.wishlistItemService.wishlistItemsBehavior.getValue(), item]);
              })
            })
          })
        }else if (items.length > 0) {
          this.isWishlist = items.map(item => item.product.id);
          this.wishlistItemService.wishlistItemsBehavior.next(items);
        } else {
          this.wishlistItemService.wishlistItemsBehavior.next([]);
        }
      },
      error: err => {
        this.relatedProducts = null;
        console.log(err);
      }
    })
  }




  getWishlistItems(){
    this.wishlistItemService.getWishlist().subscribe(wishlist=>{
      this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
        this.wishlistItems = items;
      })
    })
  }

  deleteFromWishlist(productId:number){
    const wishlistItem = this.wishlistItems.find(item=>item.product.id === productId);
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

  calcStars(starCount:number){
    return this.utilService.calcStars(starCount);
  }

  checkExist(isWishlist: number[], product: ProductResponse): boolean {
    return !!isWishlist.find(item => item === product.id);
  }
}
