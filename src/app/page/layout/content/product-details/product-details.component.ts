import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ProductDto} from "../../../../shared/dto/product-dto";
import {ProductService} from "../../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductImageDto} from "../../../../shared/dto/product-image-dto";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCheckSquare, faSquare} from "@fortawesome/free-regular-svg-icons";
import {faGithub, faMedium, faStackOverflow} from "@fortawesome/free-brands-svg-icons";
import {faCartShopping, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ProductDetailDto} from "../../../../shared/dto/product-detail-dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserDto} from "../../../../shared/dto/user-dto";
import {TokenService} from "../../../../service/token.service";
import {UserService} from "../../../../service/user.service";
import {AuthenticationService} from "../../../../service/authentication.service";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  product:ProductDto;
  relatedProducts:ProductDto[];
  user:UserDto;
  productDetail:ProductDetailDto;
  productDetails:ProductDetailDto[];
  selectedProductDetailId = 1;
  selectedQuantity = 1;
  selectedImage= '';
  productImages:ProductImageDto[] = [];
  isLoading = true;
  form:FormGroup;
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
              private router:Router,
              private authService:AuthenticationService,
              private tokenService:TokenService,
              private activatedRoute:ActivatedRoute,
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
      quantity:1,
    })
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

  onSubmit(){
    if(this.form.valid){
      this.form.value.id = parseInt(this.selectedProductDetailId.toString());
      this.form.value.weight = this.productDetail.weight;
      this.form.value.price = this.productDetail.price;
      this.form.value.quantity = this.selectedQuantity;
      console.log(this.form.value);
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
    console.log(this.product?.id)
    console.log(this.product?.flavor.id)
    this.productService.getTop10RelatedProductsByFlavor(id, flavorId).subscribe({
      next: data => {
        this.relatedProducts = data;
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
