import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../../service/product/search.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../service/product/category.service";
import {FlavorService} from "../../../service/product/flavor.service";
import {ProductOriginService} from "../../../service/product/product-origin.service";
import {VendorService} from "../../../service/vendor.service";
import {ProductOriginDto} from "../../../shared/dto/product-origin-dto";
import {CategoryDto} from "../../../shared/dto/category-dto";
import {FlavorDto} from "../../../shared/dto/flavor-dto";
import {VendorDto} from "../../../shared/dto/vendor-dto";
import {CartItemService} from "../../../service/cart-item.service";
import {CartItemDto} from "../../../shared/dto/cart-item-dto";
import {WishlistItemService} from "../../../service/wishlist-item.service";
import {WishlistItemDto} from "../../../shared/dto/wishlist-item-dto";
import {ProductDto} from "../../../shared/dto/product-dto";
import {ProductService} from "../../../service/product/product.service";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() username = '';
  @Output() onLogout = new EventEmitter();
  @Output() onUser = new EventEmitter();
  @Output() onOrders = new EventEmitter();

  amountOfCartItem = 0;
  cartItems:CartItemDto[] = [];

  amountOfWishlistItem = 0;
  wishlistItems:WishlistItemDto[] = [];

  searchValue = '';
  form:FormGroup;
  categories: CategoryDto[] = [];
  flavors:FlavorDto [] = []
  origins:ProductOriginDto[] = [];
  vendors:VendorDto[] = [];
  products: ProductDto[] = [];
  filteredProducts: Observable<ProductDto[] | null>;
  constructor(private formBuilder:FormBuilder,
              private cartItemService:CartItemService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private originService:ProductOriginService,
              private vendorService:VendorService,
              private searchService:SearchService,
              private wishlistItemService:WishlistItemService,
              private productService:ProductService,
              private router:Router){
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getFlavors();
    this.getOrigins();
    this.getVendors();
    this.form = this.formBuilder.group({
      search: ['']
    });
    this.getCartItemInformation(); //cap nhat so luong san pham trong gio hang trong header khong lien quan den database
    this.getCartItemInformationAfterAdd(); //cap nhat so luong san pham trong gio hang trong header khong lien quan den database
    this.getCartItemInformationAfterDelete(); //cap nhat so luong san pham trong gio hang trong header khong lien quan den database
    this.getWishlistInformation(); // cap nhat so luong san pham trong wishlist trong header khong lien quan den database
    this.getWishlistInformationAfterAdd(); // cap nhat so luong san pham trong wishlist trong header khong lien quan den database
    this.getWishlistInformationAfterDelete(); // cap nhat so luong san pham trong wishlist trong header khong lien quan den database
    this.filteredProducts = this.form.get("search").valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value.name;
        return name ? this.filterName(name) : this.products.slice();
      })
    )
  }

  getCartItemInformation(){
    this.cartItemService.cartItems$.subscribe(data=>{
      if(this.username){
        if(data.length > 0){
          this.cartItemService.getCart(this.username).subscribe(cart=>{
            this.cartItemService.getCartItems(cart.id).subscribe(items=>{
              this.cartItems = items;
              this.amountOfCartItem = this.cartItems.length;
            })
          });
        }else{
          this.cartItemService.getCart(this.username).subscribe(data=>{
            this.cartItemService.getCartItems(data.id).subscribe(items=>{
              this.cartItems = items;
              this.amountOfCartItem = this.cartItems.length;
            })
          });
        }
      }else{
        this.cartItems = this.cartItemService.getCartItemsFromLocalStorage();
        this.amountOfCartItem = this.cartItems.length;
      }
    })
  }

  getCartItemInformationAfterAdd(){
    this.cartItemService.addCartItems$.subscribe(data=>{
      if(this.username){
        if(data!=null){
          this.cartItemService.getCart(this.username).subscribe(cart=>{
            this.cartItemService.getCartItems(cart.id).subscribe(items=>{
              this.cartItems = [...items];
              this.amountOfCartItem = this.cartItems.length;
            })
          });
        }else{
          this.cartItemService.getCart(this.username).subscribe(data=>{
            this.cartItemService.getCartItems(data.id).subscribe(items=>{
              this.cartItems = items;
              this.amountOfCartItem = this.cartItems.length;
            })
          });
        }
      }else {
        this.cartItems = this.cartItemService.getCartItemsFromLocalStorage();
        this.amountOfCartItem = this.cartItems.length;
      }
    })

  }

  getCartItemInformationAfterDelete(){
    this.cartItemService.deleteCartItems$.subscribe(data=>{
      if(this.username){
        if(data!=null){
          this.cartItemService.getCart(this.username).subscribe(cart=>{
            this.cartItemService.getCartItems(cart.id).subscribe(items=>{
              this.cartItems = items;
              this.amountOfCartItem = this.cartItems.length;
            });
          });
        }else{
          this.cartItemService.getCart(this.username).subscribe(cart=>{
            this.cartItemService.getCartItems(cart.id).subscribe(items=>{
              this.cartItems = items;
              this.amountOfCartItem = this.cartItems.length;
            })
          });
        }
      }else {
        if(data!=null){
          const items = this.cartItemService.getCartItemsFromLocalStorage();
          const index = items.findIndex(item=>item.productDetail.id === data);
          items.splice(index, 1);
          this.cartItems = items;
          this.amountOfCartItem = this.cartItems.length;
        }else{
          this.cartItems = this.cartItemService.getCartItemsFromLocalStorage();
          this.amountOfCartItem = this.cartItems.length;
        }
      }
    })

  }

  getWishlistInformation(){
    this.wishlistItemService.wishlistItems$.subscribe(data=>{
      if(this.username){
        if(data.length > 0){
          this.wishlistItemService.getWishlist(this.username).subscribe(wishlist=>{
            this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
              this.wishlistItems = items;
              this.amountOfWishlistItem = this.wishlistItems.length;
            })
          });
        }else{
          this.wishlistItemService.getWishlist(this.username).subscribe(data=>{
            this.wishlistItemService.getWishlistItems(data.id).subscribe(items=>{
              this.wishlistItems = items;
              this.amountOfWishlistItem = this.wishlistItems.length;
            })
          });
        }
      }else{
        this.wishlistItems = this.wishlistItemService.getWishlistItemsFromLocalStorage();
        this.amountOfWishlistItem = this.wishlistItems.length;
      }
    })
  }

  getWishlistInformationAfterAdd(){
    this.wishlistItemService.addWishlistItems$.subscribe(data=>{
      if(this.username){
        if(data!=null){
          this.wishlistItemService.getWishlist(this.username).subscribe(wishlist=>{
            this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
              this.wishlistItems = items;
              this.amountOfWishlistItem = this.wishlistItems.length;
            })
          });
        }else{
          this.wishlistItemService.getWishlist(this.username).subscribe(data=>{
            this.wishlistItemService.getWishlistItems(data.id).subscribe(items=>{
              this.wishlistItems = items;
              this.amountOfWishlistItem = this.wishlistItems.length;
            })
          });
        }
      }else {
        this.wishlistItems = this.wishlistItemService.getWishlistItemsFromLocalStorage();
        this.amountOfWishlistItem = this.wishlistItems.length;
      }
    })
  }

  getWishlistInformationAfterDelete(){
    this.wishlistItemService.deleteWishlistItems$.subscribe(data=>{
      if(this.username){
        if(data!=null){
          this.wishlistItemService.getWishlist(this.username).subscribe(wishlist=>{
            this.wishlistItemService.getWishlistItems(wishlist.id).subscribe(items=>{
              this.wishlistItems = items;
              this.amountOfWishlistItem = this.wishlistItems.length;
            })
          });
        }else{
          this.wishlistItemService.getWishlist(this.username).subscribe(data=>{
            this.wishlistItemService.getWishlistItems(data.id).subscribe(items=>{
              this.wishlistItems = items;
              this.amountOfWishlistItem = this.wishlistItems.length;
            })
          });
        }
      }else {
        if(data!=null){
          const items = this.wishlistItemService.getWishlistItemsFromLocalStorage();
          const index = items.findIndex(item=>item.product.id === data);
          items.splice(index, 1);
          this.wishlistItems = items;
          this.amountOfWishlistItem = this.wishlistItems.length;
        }else{
          this.wishlistItems = this.wishlistItemService.getWishlistItemsFromLocalStorage();
          this.amountOfWishlistItem = this.wishlistItems.length;
        }
      }
    })
  }


  getProducts(){
    return this.productService.getProductDtoList()
      .subscribe({
        next:(data)=>{
          this.products = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getCategories(){
    return this.categoryService.getCategoryList()
      .subscribe({
        next:(data)=>{
          this.categories = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getFlavors(){
    return this.flavorService.getFlavorList()
      .subscribe({
        next:(data)=>{
          this.flavors = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getOrigins(){
    return this.originService.getProductOriginList()
      .subscribe({
        next:(data)=>{
          this.origins = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getVendors(){
    return this.vendorService.getVendorList()
      .subscribe({
        next:(data)=>{
          this.vendors = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  toggleLogout(){
    this.onLogout.emit();
    localStorage.clear();
  }

  toggleUser(){
    this.onUser.emit();
  }

  toggleOrders(){
    this.onOrders.emit();
  }

  onSearch(){
    this.searchValue = this.form.value.search;
    this.searchService.searchResults.next(this.searchValue);
    this.router.navigate(['/search'], {queryParams: {query: this.searchValue}});
  }

  getOptionText(option: ProductDto){
    return option!=null ? option.name : '';
  }

  filterName(name:string):ProductDto[]{
    const filterValue = name.toLowerCase();
    return this.products.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
