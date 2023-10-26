import {Component, DoCheck, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {TokenService} from "../../../../service/token.service";
import {Product} from "../../../../shared/models/product/product";
import {ProductService} from "../../../../service/product.service";
import {ProductDetailService} from "../../../../service/product-detail.service";
import {ProductImageService} from "../../../../service/product-image.service";
import {ProductDto} from "../../../../shared/dto/product-dto";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItem} from "../../../../shared/models/cart-item";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {SharedLoginUserNameService} from "../../../../service/SharedLoginUserNameService";
import {UtilService} from "../../../../service/util.service";
import {CartItemDialogComponent} from "./cart-item-dialog/cart-item-dialog.component";
import {ComponentType} from "@angular/cdk/overlay";
import {Flavor} from "../../../../shared/models/product/flavor";
import {MatDialog} from "@angular/material/dialog";
import {
  AdminFlavorDialogComponent
} from "../../../../admin/layout/content/admin-flavor/admin-flavor-dialog/admin-flavor-dialog.component";

@Component({
  selector: 'app-security',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  username: string;
  slidesPerView = 5;
  screenWidth: number;


  latestProducts: ProductDto[] = []
  bestSellerProducts: ProductDto[] = []
  specialProducts: ProductDto[] = []
  top10ColombiaProducts: ProductDto[] = []
  top10RoastedProducts: ProductDto[] = []
  top10BottledProducts: ProductDto[] = []



  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth>= 320 && this.screenWidth<=480) {
      this.slidesPerView = 1;
    } else if (this.screenWidth < 992) {
      this.slidesPerView = 2.5;
    } else if (this.screenWidth < 1200) {
      this.slidesPerView = 3.5;
    } else if (this.screenWidth< 1600) {
      this.slidesPerView = 4;
    }
  }

  constructor(private authenticationService: AuthenticationService,
              private productService:ProductService,
              private productDetailsService:ProductDetailService,
              private productImageService: ProductImageService,
              private tokenService:TokenService,
              private cartItemService: CartItemService,
              private shareLoginUserNameService: SharedLoginUserNameService,
              private utilService:UtilService,
              private dialog:MatDialog,) {
  }

  ngOnInit(){
    this.username = this.authenticationService.getUserNameFromLocalStorage();
    console.log("username tai home page", this.username);
    let cartItemInStorage: CartItemDto[] = this.cartItemService.getCartItemsFromLocalStorage();
    if (this.username && cartItemInStorage.length > 0){
      this.cartItemService.convertListCartItemAfterLogin().subscribe({
        next:(data)=>{
          this.cartItemService.removeCartItemsFromLocalStorage();
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
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
              console.log(data);
            },
            error:(err)=>{
              console.log(err);
            }
          })
  }


  getBestSellerProducts(){
    this.productService.getTop3BestSellerProducts().subscribe({
      next:(data)=>{

        this.bestSellerProducts = data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getSpecialProducts(){
    this.productService.getTop3SpecialProducts().subscribe({
      next:(data)=>{

        this.specialProducts = data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getTop10ProductsInColombia(){
    this.productService.getTop10ProductsInColombia().subscribe({
      next:(data)=>{
        this.top10ColombiaProducts = data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getTop10RoastedProducts(){
    this.productService.getTop10ProductsByRoastedCoffeeBeans().subscribe({
      next:(data)=>{
        this.top10RoastedProducts = data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getTop10BottledProducts(){
    this.productService.getTop10ProductsByBottledCoffee().subscribe({
      next:(data)=>{
        this.top10BottledProducts = data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  private openDialog(dialog:ComponentType<any> ,data?:ProductDto) {
    const dialogRef = this.dialog.open(dialog, {data});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.ngOnInit();
        }
      }
    });
  }

  openProductDetailDialog(data:ProductDto){
    this.openDialog(CartItemDialogComponent, data);
  }


}
