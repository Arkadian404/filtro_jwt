import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../../shared/models/page";
import {ProductDto} from "../../../../../shared/dto/product-dto";
import {BrandDto} from "../../../../../shared/dto/brand-dto";
import {CategoryDto} from "../../../../../shared/dto/category-dto";
import {FlavorDto} from "../../../../../shared/dto/flavor-dto";
import {ProductOriginDto} from "../../../../../shared/dto/product-origin-dto";
import {VendorDto} from "../../../../../shared/dto/vendor-dto";
import {ProductFilter} from "../../../../../shared/utils/product-filter";
import {ProductService} from "../../../../../service/product.service";
import {BrandService} from "../../../../../service/brand.service";
import {CategoryService} from "../../../../../service/category.service";
import {FlavorService} from "../../../../../service/flavor.service";
import {ProductOriginService} from "../../../../../service/product-origin.service";
import {VendorService} from "../../../../../service/vendor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {TokenService} from "../../../../../service/token.service";
import {CartItemService} from "../../../../../service/cart-item.service";
import {CartItemDto} from "../../../../../shared/dto/cart-item-dto";
import {WishlistItemDto} from "../../../../../shared/dto/wishlist-item-dto";
import {WishlistItemService} from "../../../../../service/wishlist-item.service";

@Component({
  selector: 'app-coffee-ball',
  templateUrl: './coffee-ball.component.html',
  styleUrls: ['../collection.component.scss']
})
export class CoffeeBallComponent implements OnInit{
  title = "Cà phê hạt nén"
  isError = false;
  isLoading = true;
  page:Page;
  products:ProductDto[];
  number= 0;
  sort = "";
  flavor = "";
  brand = "";
  category = "";
  origin = "";
  vendor = "";
  totalPages:Array<number> = [];

  product:ProductDto;
  form: FormGroup;
  wishlistItemForm: FormGroup;
  isWishlist: ProductDto[] = [];
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
  constructor(private productService:ProductService,
              private brandService:BrandService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private originService:ProductOriginService,
              private vendorService:VendorService,
              private activatedRoute:ActivatedRoute,
              private cartItemService:CartItemService,
              private tokenService:TokenService,
              private utilService:UtilService,
              private formBuilder:FormBuilder,
              private wishlistItemService:WishlistItemService,
              private router:Router){
  }

  ngOnInit(): void {
    this.initial();
    this.form  = this.formBuilder.group({
      quantity: 1,
    });
    this.wishlistItemForm = this.formBuilder.group({});
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
    this.number = parseInt(params['page']) ? parseInt(params['page']) : 0;
    this.flavor = params['flavor'] ? params['flavor'] : "";
    this.brand = params['brand'] ? params['brand'] : "";
    this.category = params['category'] ? params['category'] : "";
    this.origin = params['origin'] ? params['origin'] : "";
    this.vendor = params['vendor'] ? params['vendor'] : "";
  }

  getProducts(page?:number, sort?:string, flavor?:string, category?:string, brand?:string, origin?:string, vendor?:string){
    return this.productService.getCoffeeBallListPaging(page, sort, flavor, category, brand, origin, vendor)
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.page = data;
          this.products = data.content;
          this.totalPages = Array(data.totalPages).fill(0).map((x,i)=>i+1);
          this.isLoading = false;
          this.isError = false;
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
        error:(err)=>{
          console.log(err);
          this.isLoading = false
          this.isError = true;
        }
      })
  }

  goToPreviousPage(){
    let currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    if(currentPage > 0){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage - 1},
          queryParamsHandling: 'merge',
        })
    }
  }

  goToNextPage(){
    let currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    if(currentPage <= this.page.totalPages - 1){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage + 1},
          queryParamsHandling: 'merge',
        })
    }
  }

  onRadioChange(event:any){
    console.log(event.value);
    this.sort = event.value;
    this.router.navigate(
      [],{
        relativeTo: this.activatedRoute,
        queryParams:{sort: this.sort},
        queryParamsHandling: 'merge',
      })
  }

  onTagChange(page:number){
    console.log(this.page.totalPages);
    console.log(this.sort)
    // this.sort = this.activatedRoute.snapshot.queryParams.sort
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
    this.originService.getProductOriginList().subscribe({
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
