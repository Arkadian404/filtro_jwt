import {AfterViewInit, Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from "../../../../service/search.service";
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../../../../shared/dto/product-dto";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenService} from "../../../../service/token.service";
import {UtilService} from "../../../../service/util.service";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";


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
  constructor(private activatedRoute: ActivatedRoute,
              private cartItemService:CartItemService,
              private utilService:UtilService,
              private tokenService:TokenService,
              private formBuilder:FormBuilder,
              private searchService:SearchService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      quantity: 1,
    })
    this.searchService.searchResults$.subscribe({
        next: data=> {
          this.searchValue = this.activatedRoute.snapshot.queryParams.query;
          if(this.searchValue !== this.activatedRoute.snapshot.queryParams.query){
            this.getSearchResult(this.searchValue);
          }
        },
        error: err=> {
          console.log(err)
        }
      });
      this.getSearchResult(this.activatedRoute.snapshot.queryParams.query);
    }
    getSearchResult(searchValue:string){
      this.searchService.getSearchResult(searchValue).subscribe({
        next: data=> {
          this.products = data;
          this.isLoading = false;
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
}
