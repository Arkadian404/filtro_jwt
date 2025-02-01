import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../../shared/models/page";
import {ProductDto} from "../../../../../shared/dto/product-dto";
import {BrandDto} from "../../../../../shared/dto/brand-dto";
import {CategoryDto} from "../../../../../shared/dto/category-dto";
import {FlavorDto} from "../../../../../shared/dto/flavor-dto";
import {ProductOriginDto} from "../../../../../shared/dto/product-origin-dto";
import {VendorDto} from "../../../../../shared/dto/vendor-dto";
import {ProductFilter} from "../../../../../shared/utils/product-filter";
import {ProductService} from "../../../../../service/product/product.service";
import {BrandService} from "../../../../../service/product/brand.service";
import {CategoryService} from "../../../../../service/product/category.service";
import {FlavorService} from "../../../../../service/product/flavor.service";
import {ProductOriginService} from "../../../../../service/product/product-origin.service";
import {VendorService} from "../../../../../service/vendor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartItemDto} from "../../../../../shared/dto/cart-item-dto";
import {CartItemService} from "../../../../../service/cart-item.service";
import {TokenService} from "../../../../../service/token.service";
import {UtilService} from "../../../../../service/util.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WishlistItemDto} from "../../../../../shared/dto/wishlist-item-dto";
import {WishlistItemService} from "../../../../../service/wishlist-item.service";
import {CartResponse} from "../../../../../shared/response/cart-response";
import {ProductResponse} from "../../../../../shared/response/product-response";
import {WishlistItemRequest} from "../../../../../shared/request/wishlist-item-request";
import {PageResponse} from "../../../../../shared/pageResponse";
import {CartItemResponse} from "../../../../../shared/response/cart-item-response";
import {CartItemRequest} from "../../../../../shared/request/cart-item-request";
import {WishlistItemResponse} from "../../../../../shared/response/wishlist-item-response";

@Component({
  selector: 'app-africa-coffee',
  templateUrl: './africa-coffee.component.html',
  styleUrls: ['../collection.component.scss']
})
export class AfricaCoffeeComponent implements OnInit{
  title = "Khu vực Châu Phi"
  isBrandClose = true;
  isCategoryClose = true;
  isFlavorClose = true;
  isOriginClose = true;
  isVendorClose = true;
  isError = false;
  isLoading = true;
  page:PageResponse<ProductResponse>;
  products:ProductResponse[];
  number= 1;
  sort = "";
  flavor = "";
  brand = "";
  category = "";
  origin = "";
  vendor = "";
  totalPages:Array<number> = [];

  product:ProductResponse;
  form:FormGroup;
  wishlistItemForm:FormGroup;
  isWishlist:number[] = [];
  wishlistItems: WishlistItemDto[] = [];

  brands:BrandDto[] =[];
  categories:CategoryDto[] = [];
  flavors: FlavorDto[] = [];
  origins: ProductOriginDto[] = [];
  vendors: VendorDto[] = [];

  filters: ProductFilter = {
    brandFilter:[],
    categoryFilter:[],
    flavorFilter:[],
    originFilter:[],
    vendorFilter:[],
  }
  private cartItemRequest: CartItemRequest = {};
  private wishlistItemRequest: WishlistItemRequest = {};
  constructor(private readonly productService:ProductService,
              private readonly brandService:BrandService,
              private readonly categoryService:CategoryService,
              private readonly flavorService:FlavorService,
              private readonly originService:ProductOriginService,
              private readonly vendorService:VendorService,
              private readonly activatedRoute:ActivatedRoute,
              private readonly cartItemService:CartItemService,
              private readonly formBuilder:FormBuilder,
              private readonly utilService:UtilService,
              private readonly tokenService:TokenService,
              private readonly wishlistItemService:WishlistItemService,
              private readonly router:Router){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      quantity: 1,
    });
    this.wishlistItemForm = this.formBuilder.group({})
    this.initial();
    this.sort = this.activatedRoute.snapshot.queryParams.sort;
    this.flavor = this.activatedRoute.snapshot.queryParams.flavor;
    this.activatedRoute.queryParams.subscribe(
      {
        next:(params)=>{
          this.assignParam(params);
          this.getProducts(this .number, this.sort, this.flavor, this.category, this.brand, this.origin, this.vendor);
        },
        error:(err)=>{
          console.log(err);
        },
      }
    )
  }

  initial(){
    this.getBrands();
    this.getCategories();
    this.getFlavors();
    this.getOrigins();
    this.getVendors();
  }

  assignParam(params:any){
    this.number = parseInt(params['page']) ? parseInt(params['page']) : 1;
    this.sort = params['sort'] ? params['sort'] : "";
    this.flavor = params['flavor'] ? params['flavor'] : "";
    this.brand = params['brand'] ? params['brand'] : "";
    this.category = params['category'] ? params['category'] : "";
    this.origin = params['origin'] ? params['origin'] : "";
    this.vendor = params['vendor'] ? params['vendor'] : "";
  }

  getProducts(page?:number, sort?:string, flavor?:string, category?:string, brand?:string, origin?:string, vendor?:string){
    return this.productService.getContinentCoffeeListPaging("Châu Phi" ,page, sort, flavor, category, brand, origin, vendor)
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.page = data;
          this.products = data.data;
          this.totalPages = Array(data.totalPages).fill(0).map((x,i)=>i+1);
          this.isLoading = false
          this.isError = false;
          const items = this.wishlistItemService.getWishlistItemsFromLocalStorage();
          if(this.tokenService.getUsername()){
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
        error:(err)=>{
          console.log(err);
          this.isLoading = false
          this.isError = true;
        }
      })
  }

  goToPreviousPage(){
    const currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    if(currentPage > 1){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage - 1},
          queryParamsHandling: 'merge',
        })
    }
  }

  goToNextPage(){
    const currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    if(currentPage <= this.page.totalPages){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage + 1},
          queryParamsHandling: 'merge',
        })
    }
  }

  onRadioChange(event:any){
    this.sort = event.value;
    this.router.navigate(
      [],{
        relativeTo: this.activatedRoute,
        queryParams:{sort: this.sort},
        queryParamsHandling: 'merge',
      })
  }

  onTagChange(page:number){
    this.router.navigate(
      [],{
        relativeTo: this.activatedRoute,
        queryParams:{page: page},
        queryParamsHandling: 'merge',
      })
  }

  getBrands(){
    this.brandService.getBrandList().subscribe({
      next:(data)=>{
        this.brands = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getCategories(){
    this.categoryService.getCategoryList().subscribe({
      next:(data)=>{
        this.categories = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getFlavors(){
    this.flavorService.getFlavorList().subscribe({
      next:(data)=>{
        this.flavors = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getOrigins(){
    this.originService.getProductOriginContinentList("Châu Phi").subscribe({
      next:(data)=>{
        this.origins = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getVendors(){
    this.vendorService.getVendorList().subscribe({
      next:(data)=>{
        this.vendors = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onBrandChange(event:any){
    if(event.checked){
      this.filters.brandFilter.push(event.source.value);
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams:{brand: this.filters.brandFilter},
          queryParamsHandling: 'merge',
        }
      )
    }else{
      this.filters.brandFilter = this.filters.brandFilter.filter(value => {
        return value != event.source.value;
      });
      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams:{brand: this.filters.brandFilter},
          queryParamsHandling: 'merge',
        })
    }
  }

  onCategoryChange(event:any){
    console.log(event.source.value);
    if(event.checked){
      this.filters.categoryFilter.push(event.source.value);
      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams:{category: this.filters.categoryFilter},
          queryParamsHandling: 'merge',
        })
    }else{
      this.filters.categoryFilter = this.filters.categoryFilter.filter(value => {
        return value != event.source.value;
      });
      this.router.navigate([],{
        relativeTo: this.activatedRoute,
        queryParams:{category: this.filters.categoryFilter},
        queryParamsHandling: 'merge',
      })
    }
    console.log(this.filters.categoryFilter);
  }

  onFlavorChange(event:any){
    if(event.checked){
      this.filters.flavorFilter.push(event.source.value);
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams:{flavor: this.filters.flavorFilter},
          queryParamsHandling: 'merge',
        }
      )
    }else{
      this.filters.flavorFilter = this.filters.flavorFilter.filter(value => {
        return value != event.source.value;
      })
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams:{flavor: this.filters.flavorFilter},
          queryParamsHandling: 'merge',
        }
      )
    }
  }

  onOriginChange(event:any){
    if(event.checked){
      this.filters.originFilter.push(event.source.value);
      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams:{origin: this.filters.originFilter},
          queryParamsHandling: 'merge',
        })
    }else{
      this.filters.originFilter = this.filters.originFilter.filter(value => {
        return value != event.source.value;
      });
      this.router.navigate([],{
        relativeTo: this.activatedRoute,
        queryParams:{origin: this.filters.originFilter},
        queryParamsHandling: 'merge',
      })
    }
  }

  onVendorChange(event:any){
    if(event.checked){
      this.filters.vendorFilter.push(event.source.value);
      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams:{vendor: this.filters.vendorFilter},
          queryParamsHandling: 'merge',
        })
    }else {
      this.filters.vendorFilter = this.filters.vendorFilter.filter((value)=>{
        return value != event.source.value;
      });
      this.router.navigate([],{
        relativeTo: this.activatedRoute,
        queryParams:{vendor: this.filters.vendorFilter},
        queryParamsHandling: 'merge',
      })
    }
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


  addCartItemToCart(cartItem: CartResponse){
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


  checkExist(isWishlist: number[], product: ProductResponse): boolean {
    return !!isWishlist.find(item => item === product.id);
  }

  calcStars(starCount:number){
    return this.utilService.calcStars(starCount);
  }
}
