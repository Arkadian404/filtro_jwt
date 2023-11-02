import {Component, HostListener, OnInit} from '@angular/core';
import {TokenService} from "../../../../service/token.service";
import {ProductService} from "../../../../service/product.service";
import {ProductDto} from "../../../../shared/dto/product-dto";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../service/util.service";


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
  form:FormGroup;


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
              private utilService:UtilService) {
  }

  ngOnInit(){
    const cartItems = this.cartItemService.getCartItemsFromLocalStorage();
    this.username = this.tokenService.getUsername();
    this.convertCartItemsToUserCart(cartItems, this.username);
    this.form = this.formBuilder.group({
      quantity:1,
    })
    this.getLatestProducts();
    this.getBestSellerProducts();
    this.getSpecialProducts();
    this.getTop10ProductsInColombia();
    this.getTop10RoastedProducts();
    this.getTop10BottledProducts();

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
        console.log(this.cartItemService.cartItemsBehavior.getValue());
        this.cartItemService.getCart(username).subscribe({
          next:(cart)=>{
            cartItems.forEach(ci=>{
              ci.cart = cart;
              this.cartItemService.addCartItemToCart(ci).subscribe();
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
    if(this.form.valid){
      this.form.value.productName = this.selectedProduct.name;
      this.form.value.productDetail =this.selectedProduct.productDetails[0];
      this.form.value.productImage =  this.selectedProduct.images[0];
      this.form.value.price = this.selectedProduct.productDetails[0].price;
      this.form.value.total = this.form.value.quantity * this.form.value.price;
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

  addToWishlist(event:any){
    console.log(event);
  }

}
