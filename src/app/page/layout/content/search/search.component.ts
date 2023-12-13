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


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  isLoading = true;
  searchValue = '';
  products:ProductDto[] = []
  product:ProductDto;
  form:FormGroup;
  wishlistItemForm:FormGroup;
  wishlistItems: WishlistItemDto[] = [];
  isWishlist: ProductDto[] = [];
  constructor(private activatedRoute: ActivatedRoute,
              private cartItemService:CartItemService,
              private utilService:UtilService,
              private tokenService:TokenService,
              private formBuilder:FormBuilder,
              private wishlistItemService:WishlistItemService,
              private searchService:SearchService) {
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
                });
              });
            }else{
              this.wishlistItemService.getWishlist(this.tokenService.getUsername()).subscribe(wishlist=>{
                this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(wishlistItems=>{
                  this.getWishlistItems();
                  this.isWishlist = wishlistItems.map(item=>item.product);
                });
              });
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
        error: err=> {
          this.products = [];
          console.log(err)
          this.isLoading = false;
      }
     })
  }

  addToCart(event:ProductDto){
    this.product = event;
    if(this.form.valid){
      this.form.value.productName = this.product.name;
      this.form.value.slug = this.product.slug;
      this.form.value.productDetail =this.product.productDetails[0];
      this.form.value.productImage =  this.product.images[0];
      this.form.value.price = this.product.productDetails[0].price;
      this.form.value.total = this.form.value.quantity * this.form.value.price;
    }
    console.log(this.form.value);
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





}
