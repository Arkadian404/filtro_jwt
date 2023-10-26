import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProductDetail} from "../../../../../shared/models/product/product-detail";
import {Product} from "../../../../../shared/models/product/product";
import {ProductDto} from "../../../../../shared/dto/product-dto";
import {ProductDetailDto} from "../../../../../shared/dto/product-detail-dto";
import {UtilService} from "../../../../../service/util.service";
import {AuthenticationService} from "../../../../../service/authentication.service";
import {CartItemService} from "../../../../../service/cart-item.service";
import {CartItemDto} from "../../../../../shared/dto/cart-item-dto";

@Component({
  selector: 'app-cart-item-dialog',
  templateUrl: './cart-item-dialog.component.html',
  styleUrls: ['./cart-item-dialog.component.scss']
})
export class CartItemDialogComponent implements OnInit{

  // @ts-ignore
  form:FormGroup<any>;
  productDetailDtos: ProductDetailDto[] = [];
  username: string;
  cartItems: CartItemDto[] = [];

  constructor(private formBuilder:FormBuilder,
              private matDialog:MatDialogRef<CartItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private utilService:UtilService,
              private authenticationService: AuthenticationService,
              private cartItemService: CartItemService,) {
  }

  ngOnInit() {
    this.username = this.authenticationService.getUserNameFromLocalStorage();
    this.form = this.formBuilder.group({
      name: '',
      productDetailDto: [null],

    });
    if(this.data){
      console.log(this.data);
      this.form.patchValue(this.data);
      this.productDetailDtos = this.data.productDetails;

    }
  }

  onSubmit(){
    if(this.form.valid){
      const selectedProductDetailDto = this.form.get('productDetailDto').value;
      console.log("selectedProductDetailDto: ",selectedProductDetailDto );
      if(this.data && selectedProductDetailDto !== null){
        // console.log("selectedProductDetailDto: ", selectedProductDetailDto)
        console.log(this.data);
        // console.log("Gia tri product detail sau khi chon: ", this.data.id);
        // console.log("Gia tri product detail sau khi chon: ", selectedProductDetailDto.price);
        // console.log("Gia tri product detail sau khi chon: ", selectedProductDetailDto.weight);
        const newProductDto: ProductDto = this.data;
        newProductDto.productDetails = [];
        newProductDto.productDetails.push(selectedProductDetailDto);
        console.log("data newProductDto sau khi change: ", newProductDto);
        this.addToCart(newProductDto);
        this.matDialog.close(true);
        // this.utilService.openSnackBar('Thêm vào giỏ hàng thành công!', 'Đóng')
      }else{
        console.log(this.form.value);
        this.utilService.openSnackBar('Thêm vào giỏ hàng không thành công!', 'Đóng')
      }
    }
  }

  addToCart(product: ProductDto): void {
    console.log("productDto them vao gio hang sau khi tat dialog: ", product);
    if(this.username){
      // this.cartItemService.addToCartAfterLogin(product).subscribe({
      //   next: (data) =>{
      //     this.utilService.openSnackBar('Thêm sản phẩm vào giỏ hàng thành công', 'Đóng');
      //   }
      // });
      this.cartItemService.addToCartAfterLogin(product);
      this.utilService.openSnackBar('Thêm sản phẩm vào giỏ hàng thành công', 'Đóng');
      // console.log("them vao gio hang da login", this.cartItems);
    } else {
      this.cartItemService.addToCartNotLogin(product);
      this.cartItems = this.cartItemService.getCartItemsFromLocalStorage();
      this.utilService.openSnackBar('Thêm sản phẩm vào giỏ hàng thành công', 'Đóng');
      // console.log("them vao gio hang chua login", this.cartItems);
    }
    // Call your cart service to add the product to the cart
  }

  public compareObjectFunction = function (object, value):boolean{
    if (object == null || value == null){
      return !!"''"
    }
    return object.id === value.id;
  }

  onProductDetailChange(event:any){
    const productDetailDto = event.source._value;
    if(productDetailDto === "''" || productDetailDto === ""){
      this.form.patchValue({productDetailDto: null});
    }
  }

}
