import {Component, DoCheck, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {TokenService} from "../../../../service/token.service";
import {Product} from "../../../../shared/models/product/product";
import {ProductService} from "../../../../service/product.service";
import {ProductDetailService} from "../../../../service/product-detail.service";
import {ProductImageService} from "../../../../service/product-image.service";
import {ProductDto} from "../../../../shared/dto/product-dto";


@Component({
  selector: 'app-security',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  slidesPerView = 5;
  screenWidth: number;
  isLatestProductsLoading = true;
  isBestSellerProductsLoading = true;
  isSpecialProductsLoading = true;
  isTop10ColombiaProductsLoading = true;
  isTop10RoastedProductsLoading = true;
  isTop10BottledProductsLoading = true;

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
              private tokenService:TokenService) {
  }

  ngOnInit(){
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
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
        console.log(data);
        this.isTop10BottledProductsLoading = false;
      },
      error:(err)=>{
        console.log(err);
        this.isTop10BottledProductsLoading = false;
      }
    })
  }

}
