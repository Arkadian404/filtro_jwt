import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TokenService} from "../../../../service/token.service";
import {ProductService} from "../../../../service/product/product.service";
import {ProductDto} from "../../../../shared/dto/product-dto";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../service/util.service";
import {WishlistItemService} from "../../../../service/wishlist-item.service";
import {WishlistItemDto} from "../../../../shared/dto/wishlist-item-dto";
import {RecommenderService} from "../../../../service/recommender.service";
import {UserService} from "../../../../service/user/user.service";
import {switchMap} from "rxjs";
import {ProductResponse} from "../../../../shared/response/product-response";
import {CartItemResponse} from "../../../../shared/response/cart-item-response";
import {CartItemRequest} from "../../../../shared/request/cart-item-request";
import {WishlistItemRequest} from "../../../../shared/request/wishlist-item-request";
import {WishlistItemResponse} from "../../../../shared/response/wishlist-item-response";



@Component({
  selector: 'app-security',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  username: string;
  slidesPerView = 5;
  screenWidth: number;
  isLatestProductsLoading = true;
  isBestSellerProductsLoading = true;
  isSpecialProductsLoading = true;
  isTop10ColombiaProductsLoading = true;
  isTop10RoastedProductsLoading = true;
  isTop10BottledProductsLoading = true;

  selectedProduct: ProductResponse;
  latestProducts: ProductResponse[] = []
  bestSellerProducts: ProductResponse[] = []
  specialProducts: ProductResponse[] = []
  top10ColombiaProducts: ProductResponse[] = []
  top10RoastedProducts: ProductResponse[] = []
  top10BottledProducts: ProductResponse[] = []
  cartItemRequest: CartItemRequest = {};
  isWishlist: number[] = [];
  wishlistItems: WishlistItemRequest[] = [];
  wishlistItemsResponse: WishlistItemResponse[] = [];

  cartItemForm:FormGroup;
  wishlistItemForm:FormGroup;
  // @ViewChildren('btnWishlist') wishlistButton: QueryList<ElementRef>
  recommendProducts: ProductResponse[] = [];
  isRecommendProductsLoading = true;


  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth<=576) {
      this.slidesPerView = 1;
    } else if (this.screenWidth < 992) {
      this.slidesPerView = 2.5;
    } else if (this.screenWidth < 1200) {
      this.slidesPerView = 3.5;
    }else{
      this.slidesPerView = 5;
    }
  }

  private wishlistItemRequest: WishlistItemRequest = {};

  constructor(private readonly formBuilder:FormBuilder,
              private readonly productService:ProductService,
              private readonly tokenService:TokenService,
              private readonly cartItemService: CartItemService,
              private readonly wishlistItemService:WishlistItemService,
              private readonly userService:UserService,
              private readonly recommenderService:RecommenderService,
              private readonly utilService:UtilService) {
  }

  ngOnInit(){
    const cartItems = this.cartItemService.getCartItemsFromLocalStorage();
    const wishlistItems = this.wishlistItemService.getWishlistItemsFromLocalStorage();
    this.username = this.tokenService.getUsername();
    this.convertCartItemsToUserCart(cartItems, this.username);
    this.convertWishlistItemsToUserWishlist(wishlistItems, this.username);
    this.cartItemForm = this.formBuilder.group({
      quantity:1,
    });
    this.wishlistItemForm = this.formBuilder.group({
      productId: null,
    })
    this.getLatestProducts();
    this.getBestSellerProducts();
    this.getSpecialProducts();
    this.getTop10ProductsInColombia();
    this.getTop10RoastedProducts();
    this.getTop10BottledProducts();
    // this.recommendProductsForUser();
  }

  getLatestProducts(){
      this.productService.getTop3LatestProducts()
          .subscribe({
            next:(data)=>{
              this.latestProducts = data;
              this.isLatestProductsLoading = false;
            },
            error:(err)=>{
              console.log(err);
              this.isLatestProductsLoading = false;
            }
          })
  }


  getBestSellerProducts(){
    this.productService.getTop3BestSellerProducts().subscribe({
      next:(data)=>{
        this.bestSellerProducts = data;
        this.isBestSellerProductsLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isBestSellerProductsLoading = false;
      }
    })
  }

  getSpecialProducts(){
    this.productService.getTop3SpecialProducts().subscribe({
      next:(data)=>{
        this.specialProducts = data;
        this.isSpecialProductsLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isSpecialProductsLoading = false;
      }
    })
  }

  getTop10ProductsInColombia(){
    this.productService.getTop10ProductsInColombia().subscribe({
      next:(data)=>{
        this.top10ColombiaProducts = data;
        this.isTop10ColombiaProductsLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isTop10ColombiaProductsLoading = false;
      }
    })
  }

  getTop10RoastedProducts(){
    this.productService.getTop10ProductsByRoastedCoffeeBeans().subscribe({
      next:(data)=>{
        this.top10RoastedProducts = data;
        this.isTop10RoastedProductsLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isTop10RoastedProductsLoading = false;
      }
    })
  }

  getTop10BottledProducts(){
    this.productService.getTop10ProductsByBottledCoffee().subscribe({
      next:(data)=>{
        this.top10BottledProducts = data;
        this.isTop10BottledProductsLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isTop10BottledProductsLoading = false;
      }
    })
  }


  convertCartItemsToUserCart(cartItems: CartItemResponse[], username:string){
    if(this.username){
      if(cartItems.length > 0){
        this.cartItemService.getCart(username).subscribe({
          next:(cart)=>{
            console.log(cart);
            console.log(cartItems);
            cartItems.forEach(ci=>{
              ci.cart = cart;
              this.cartItemRequest = this.mapCartToRequest(ci);
              this.cartItemService.addCartItemToCart(this.cartItemRequest).subscribe(item=>{
                console.log(item);
              });
              this.cartItemService.cartItemsBehavior.next([...this.cartItemService.cartItemsBehavior.getValue(), ci]);
            })
            localStorage.removeItem("cartItems");
          }
        });
      }else{
        this.cartItemService.getCart(username).subscribe(cart=>{
          this.cartItemService.getCartItems(cart.id).subscribe(items=>{
            this.cartItemService.cartItemsBehavior.next(items);
          })
        })
      }
    }else if (cartItems.length > 0) {
      this.cartItemService.cartItemsBehavior.next(cartItems);
    } else {
      this.cartItemService.cartItemsBehavior.next([]);
    }
  }



  convertWishlistItemsToUserWishlist(wishlistItems: WishlistItemResponse[], username:string){
    if(this.username){
      if(wishlistItems.length > 0){
        this.wishlistItemService.getWishlist().subscribe(wishlist=>{
          wishlistItems.forEach(wi=>{
            wi.wishlist = wishlist;
            this.wishlistItemRequest = this.mapWishlistItemRequest(wi);
            this.wishlistItemService.addWishlistItemToWishlist(this.wishlistItemRequest).subscribe(item=>{
              console.log(item);
            });
            this.wishlistItemService.wishlistItemsBehavior.next(
              [...this.wishlistItemService.wishlistItemsBehavior.getValue(), wi]
            );
          });
          this.getWishlistItems();
          this.isWishlist = wishlistItems.map(item => item.product.id);
          localStorage.removeItem("wishlistItems");
        });
      }else{
        this.wishlistItemService.getWishlist().subscribe(wishlist=>{
          this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
            this.wishlistItemsResponse = items;
            this.isWishlist = items.map(item => item.product.id);
            items.forEach(item => {
              this.wishlistItemService.wishlistItemsBehavior.next({
                ...this.wishlistItemService.wishlistItemsBehavior.getValue(),
                ...item
              })
            })
          })
        })
      }
    }else if (wishlistItems.length > 0) {
      this.isWishlist = wishlistItems.map(item => item.product.id);
      this.wishlistItemService.wishlistItemsBehavior.next(wishlistItems);
    } else {
      this.wishlistItemService.wishlistItemsBehavior.next([]);
    }
  }



  addCartItemToCart(cartItem:CartItemRequest){
    console.log(cartItem);
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

  mapCartToRequest(cart: CartItemResponse): CartItemRequest{
    this.cartItemRequest.cartId = cart.cart.id;
    this.cartItemRequest.productDetailId = cart.productDetail.id;
    this.cartItemRequest.price = cart.productDetail.price;
    this.cartItemRequest.quantity = cart.quantity;
    this.cartItemRequest.total = cart.total;
    return this.cartItemRequest;
  }

  addToCart(event:ProductResponse){
    this.selectedProduct = event;
    if(this.cartItemForm.valid){
      this.cartItemForm.value.prductName = this.selectedProduct.name;
      this.cartItemForm.value.slug = this.selectedProduct.slug;
      this.cartItemForm.value.productDetail =this.selectedProduct.productDetails[0];
      this.cartItemForm.value.productImage = this.selectedProduct.images[0];
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
          this.cartItemRequest = this.mapCartToRequest(this.cartItemForm.value);
          console.log(this.cartItemRequest);
          this.addCartItemToCart(this.cartItemRequest);
        }
      })
    }
  }



  getWishlistItems(){
    this.wishlistItemService.getWishlist().subscribe(wishlist=>{
      this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
        this.wishlistItemsResponse = items;
      })
    })
  }

  deleteFromWishlist(productId:number){
    const wishlistItem = this.wishlistItemsResponse.find(item=>item.product.id === productId);
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
    this.selectedProduct = event;
    if(this.wishlistItemForm.valid){
      this.wishlistItemForm.value.product = this.selectedProduct;
    }
    if (!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null) {
      if(this.checkExist(this.isWishlist, this.selectedProduct)){
        this.isWishlist = this.isWishlist.filter(item => item !== this.selectedProduct.id);
      }else{
        this.isWishlist.push(this.selectedProduct.id);
      }
      this.wishlistItemService.handleWishlistNotLogin(this.wishlistItemForm.value);
    }else{
      this.wishlistItemService.getWishlist().subscribe(wishlist=>{
        this.wishlistItemForm.value.wishlist = wishlist;
        this.wishlistItemRequest = this.mapWishlistItemRequest(this.wishlistItemForm.value);
        if(this.checkExist(this.isWishlist, this.selectedProduct)){
          this.deleteFromWishlist(this.selectedProduct.id);
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

  checkExist(isWishlist: number[], product: ProductResponse): boolean {
    return !!isWishlist.find(item => item === product.id);
  }

  calcStars(starCount:number){
    return this.utilService.calcStars(starCount);
  }

  recommendProductsForUser(){
    if(this.username && this.tokenService.getUsername()){
      this.userService.currentUser()
        .pipe(switchMap(user => this.recommenderService.recommendProductsForUser(user.id)))
        .subscribe({
          next:(data)=>{
            if(data.length > 0){
              this.recommendProducts = data;
            }else{
              this.recommendProducts = [];
            }
            this.isRecommendProductsLoading = false;
          },
          error:(err)=>{
            console.log(err);
            this.recommendProducts = [];
            this.isRecommendProductsLoading = false;
          }
        })
    }
  }


}
