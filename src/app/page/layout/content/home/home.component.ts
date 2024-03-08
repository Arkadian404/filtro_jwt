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
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UserService} from "../../../../service/user/user.service";
import {switchMap} from "rxjs";


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

  selectedProduct: ProductDto;
  latestProducts: ProductDto[] = []
  bestSellerProducts: ProductDto[] = []
  specialProducts: ProductDto[] = []
  top10ColombiaProducts: ProductDto[] = []
  top10RoastedProducts: ProductDto[] = []
  top10BottledProducts: ProductDto[] = []

  isWishlist: ProductDto[] = [];
  wishlistItems: WishlistItemDto[] = [];

  cartItemForm:FormGroup;
  wishlistItemForm:FormGroup;
  // @ViewChildren('btnWishlist') wishlistButton: QueryList<ElementRef>
  recommendProducts: ProductDto[] = [];
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

  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private tokenService:TokenService,
              private cartItemService: CartItemService,
              private wishlistItemService:WishlistItemService,
              private userService:UserService,
              private recommenderService:RecommenderService,
              private utilService:UtilService) {
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
      product: null,
    })
    this.getLatestProducts();
    this.getBestSellerProducts();
    this.getSpecialProducts();
    this.getTop10ProductsInColombia();
    this.getTop10RoastedProducts();
    this.getTop10BottledProducts();
    this.recommendProductsForUser();
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


  convertCartItemsToUserCart(cartItems: CartItemDto[], username:string){
    if(this.username){
      if(cartItems.length > 0){
        this.cartItemService.getCart(username).subscribe({
          next:(cart)=>{
            console.log(cart);
            console.log(cartItems);
            cartItems.forEach(ci=>{
              ci.cart = cart;
              this.cartItemService.addCartItemToCart(ci).subscribe(item=>{
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
    }else{
      if(cartItems.length > 0){
        this.cartItemService.cartItemsBehavior.next(cartItems);
      }else{
        this.cartItemService.cartItemsBehavior.next([]);
      }
    }
  }

  convertWishlistItemsToUserWishlist(wishlistItems: WishlistItemDto[], username:string){
    if(this.username){
      if(wishlistItems.length > 0){
        this.wishlistItemService.getWishlist(username).subscribe(wishlist=>{
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
        });
      }else{
        this.wishlistItemService.getWishlist(username).subscribe(wishlist=>{
          this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
            this.wishlistItems = items;
            this.isWishlist = items.map(item=>item.product);
            this.wishlistItemService.wishlistItemsBehavior.next(items);
          })
        })
      }
    }else{
      if(wishlistItems.length > 0){
        this.isWishlist = wishlistItems.map(item=>item.product);
        this.wishlistItemService.wishlistItemsBehavior.next(wishlistItems);
      }else{
        this.wishlistItemService.wishlistItemsBehavior.next([]);
      }
    }
  }

  addCartItemToCart(cartItem:CartItemDto){
    this.cartItemService.addCartItemToCart(cartItem).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, "Đóng");
        this.cartItemService.addCartItemsBehavior.next(cartItem);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  addToCart(event:any){
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
      })
    }
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
    this.wishlistItemService.getWishlist(this.username).subscribe(wishlist=>{
      this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
        this.wishlistItems = items;
      })
    })
  }

  deleteFromWishlist(productId:number){
    const wishlistItem = this.wishlistItems.find(item=>item.product.id === productId);
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
    this.selectedProduct = event;
    if(this.wishlistItemForm.valid){
      this.wishlistItemForm.value.product = this.selectedProduct;
    }
    if (!this.tokenService.getAccessToken() || this.tokenService.getUsername() == null) {
      if(this.checkExist(this.isWishlist, this.selectedProduct)){
        this.isWishlist.splice(this.isWishlist.indexOf(this.selectedProduct),1);
      }else{
        this.isWishlist.push(this.selectedProduct);
      }
      this.wishlistItemService.handleWishlistNotLogin(this.wishlistItemForm.value);
    }else{
      this.wishlistItemService.getWishlist(this.username).subscribe(wishlist=>{
        this.wishlistItemForm.value.wishlist = wishlist;
        if(this.checkExist(this.isWishlist, this.selectedProduct)){
          this.deleteFromWishlist(this.selectedProduct.id);
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

  recommendProductsForUser(){
    console.log("CALLING RECOMMEND PRODUCTS");
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
