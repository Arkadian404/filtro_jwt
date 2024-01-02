import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ProductDto} from "../../../../shared/dto/product-dto";
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
import {UserService} from "../../../../service/user/user.service";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {CartItemService} from "../../../../service/cart-item.service";
import {UtilService} from "../../../../service/util.service";
import {WishlistItemDto} from "../../../../shared/dto/wishlist-item-dto";
import {WishlistItemService} from "../../../../service/wishlist-item.service";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product:ProductDto;
  relatedProducts:ProductDto[]=[];
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
  wishlistItems:WishlistItemDto[] = [];
  wishlistItem:WishlistItemDto;
  isWishlist:ProductDto[] = [];
  slidesPerView=5;
  screenWidth:number;


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


  constructor(private productService:ProductService,
              private formBuilder:FormBuilder,
              private authService:AuthenticationService,
              private tokenService:TokenService,
              private activatedRoute:ActivatedRoute,
              private cartItemService:CartItemService,
              private wishlistItemService:WishlistItemService,
              private utilService:UtilService,
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
        console.log(this.product);
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

  addCartItemToCart(cartItem:CartItemDto){
    this.cartItemService.addCartItemToCart(cartItem).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, "Đóng");
        this.cartItemService.addCartItemsBehavior.next(cartItem);
      },
      error:(err)=>{
        console.log(err);
        this.utilService.openSnackBar(err, "Đóng");
      }
    })
  }

  addToCart(event:any){
    this.product = event;
    if(this.form.valid){
      this.form.value.productName = this.product.name;
      this.form.value.slug = this.product.slug;
      this.form.value.productDetail =this.productDetail;
      this.form.value.productImage =  this.product.images[0];
      this.form.value.price = this.productDetail.price;
      this.form.value.quantity = this.selectedQuantity;
      this.form.value.total = this.form.value.quantity  * this.form.value.price;
    }
    console.log(this.form.value)
    if(!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null){
      this.cartItemService.addToCartNotLogin(this.form.value)
    }else{
      this.cartItemService.getCart(this.tokenService.getUsername()).subscribe({
        next:(data)=>{
          this.form.value.cart = data;
          this.addCartItemToCart(this.form.value);
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
          if(items.length > 0){
            this.wishlistItemService.getWishlist(this.tokenService.getUsername()).subscribe(wishlist=>{
              this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(wishlistItems=>{
                wishlistItems.forEach(wi=>{
                  wi.wishlist = wishlist;
                  this.wishlistItemService.addWishlistItemToWishlist(wi).subscribe(item=>{
                    console.log(item);
                  });
                  this.wishlistItemService.wishlistItemsBehavior.next([...this.wishlistItemService.wishlistItemsBehavior.getValue(), wi]);
                });
                this.getWishlistItems();
                this.isWishlist = wishlistItems.map(item=>item.product);
                localStorage.removeItem("wishlistItems");
              })
            })
          }else{
            this.wishlistItemService.getWishlist(this.tokenService.getUsername()).subscribe(wishlist=>{
              this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
                this.wishlistItems = items;
                this.isWishlist = items.map(item=>item.product);
                this.wishlistItemService.wishlistItemsBehavior.next(items);
              })
            })
          }
        }else{
          if(items.length > 0){
            this.isWishlist = items.map(item=>item.product);
            this.wishlistItemService.wishlistItemsBehavior.next(items);
          }else{
            this.wishlistItemService.wishlistItemsBehavior.next([]);
          }
        }
      },
      error: err => {
        this.relatedProducts = null;
        console.log(err);
      }
    })
  }


  addToWishlist(wishlistItem:WishlistItemDto){
    this.wishlistItemService.addWishlistItemToWishlist(wishlistItem).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, "Đóng");
        this.wishlistItemService.addWishlistItemsBehavior.next(wishlistItem);
        this.isWishlist.push(wishlistItem.product);
        this.getWishlistItems();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getWishlistItems(){
    this.wishlistItemService.getWishlist(this.tokenService.getUsername()).subscribe(wishlist=>{
      this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
        this.wishlistItems = items;
      })
    })
  }

  deleteFromWishlist(productId:number){
    const wishlistItem = this.wishlistItems.find(item=>item.product.id === productId);
    console.log(wishlistItem);
    console.log(productId);
    console.log(this.wishlistItems);
    this.wishlistItemService.deleteWithLogin(wishlistItem?.id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, "Đóng");
        this.wishlistItemService.deleteWishlistItemsBehavior.next(productId);
        const index = this.isWishlist.findIndex(item => item.id === productId);
        this.isWishlist.splice(index,1);
        this.getWishlistItems();
        console.log(this.wishlistItems);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  handleWishlist(event:any){
    this.product = event;
    if(this.wishlistItemForm.valid){
      this.wishlistItemForm.value.product = this.product;
    }
    if (!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null) {
      if(this.checkExist(this.isWishlist, this.product)){
        this.isWishlist.splice(this.isWishlist.indexOf(this.product),1);
      }else{
        this.isWishlist.push(this.product);
      }
      this.wishlistItemService.handleWishlistNotLogin(this.wishlistItemForm.value);
      console.log(this.isWishlist);
    }else{
      this.wishlistItemService.getWishlist(this.tokenService.getUsername()).subscribe(wishlist=>{
        this.wishlistItemForm.value.wishlist = wishlist;
        if(this.checkExist(this.isWishlist, this.product)){
          this.deleteFromWishlist(this.product.id);
        }else{
          this.addToWishlist(this.wishlistItemForm.value);
        }
      })
    }
  }

  checkExist(isWishlist: ProductDto[], product: ProductDto): boolean {
    return !!isWishlist.find(item => item.id === product.id);
  }

  calcStars(starCount:number){
    return this.utilService.calcStars(starCount);
  }
}
