import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {UserDto} from "../../../../shared/dto/user-dto";
import {tap} from "rxjs";
// @ts-ignore
import * as data from "../../../../shared/utils/data.json";
import {Province} from "../../../../shared/models/province";
import {District} from "../../../../shared/models/district";
import {Ward} from "../../../../shared/models/ward";
import {TokenService} from "../../../../service/token.service";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";
import {CartDto} from "../../../../shared/dto/cart-dto";
import {OrderService} from "../../../../service/order.service";
import {Router} from "@angular/router";
import {OrderDto} from "../../../../shared/dto/order-dto";
import {ShippingMethodDto} from "../../../../shared/dto/shipping-method-dto";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  infoForm:FormGroup;
  moneyForm:FormGroup;
  orderForm:FormGroup;
  isLoading = true;
  cart:CartDto;
  cartItems: CartItemDto[] =[];
  order:OrderDto;
  selectedShipping:ShippingMethodDto;
  shippingMethods:ShippingMethodDto[] = [];
  selectedPaymentMethod = "";
  user:UserDto;
  dataJson = data;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private tokenService:TokenService,
              private cartItemService:CartItemService,
              private orderService:OrderService,
              private router:Router){
  }

  ngOnInit() {
    this.getProvinces();
    this.infoForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      notes: '',
    });
    this.moneyForm = this.formBuilder.group({
      shippingMethod: ['', Validators.required],
      paymentMethod: ['', Validators.required]
    });
    this.orderForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      notes: '',
      paymentMethod: ['', Validators.required],
      shippingMethod:'',
      total: '',
    });
    this.getShippingMethods();
    this.getUser();
    this.getCartItems();
  }

  getShippingMethods(){
    this.orderService.getShippingMethods().subscribe({
      next:data=>{
        this.shippingMethods = data;
        console.log(this.shippingMethods);
      },
      error:err=>{console.log(err)}
    })
  }
  getProvinces() {
    this.provinces = Object.values(<Province[]>this.dataJson).slice(0, 63);
  }

  onProvinceChange(event: any) {
    const province = event.source._value;
    console.log(province);
    this.districts = this.provinces.find(p => p.name === province)?.districts || []
  }

  onDistrictChange(event: any) {
    const district = event.source._value;
    console.log(district);
    this.wards = this.districts.find(d => d.name === district)?.wards || []
  }

  onWardChange(event: any) {
    const ward = event.source._value;
    console.log(ward);
  }


  getUser(){
    this.userService.currentUser().pipe(
      tap(user=>{this.user = user}
      )).subscribe({
        next:data=>{
          if(data){
            this.infoForm.patchValue({
              fullName: data.firstname + ' ' + data.lastname,
              email: data.email,
              phone: data.phone,
              address: data.address,
              province: data.province,
              district: data.district,
              ward: data.ward,
            });
            this.onProvinceChange({source: {_value: data.province}});
            this.onDistrictChange({source: {_value: data.district}});
            this.onWardChange({source: {_value: data.ward}});
          }
        },
        error:err=>{console.log(err)}
      }
    );
  }

  getCartItems(){
    this.cartItemService.getCart(this.tokenService.getUsername()).subscribe(cart=>{
      this.cart = cart;
      this.cartItemService.getCartItems(this.cart.id).subscribe(cartItems=>{
          this.cartItems = cartItems;
          this.isLoading = false;
          console.log(this.cartItems);
      })
    })
  }


  onShippingChange(event:any){
    this.selectedShipping = event.value;
  }

  onPaymentChange(event:any){
    this.selectedPaymentMethod = event.value;
  }

  onCodCallback(orderCode:string){
    this.router.navigate(['/payment/cod'], {queryParams: {orderCode : orderCode}});
  }

  onSubmit() {
    if(this.infoForm.valid && this.moneyForm.valid){
      this.orderForm.patchValue({
        fullName: this.infoForm.value.fullName,
        email: this.infoForm.value.email,
        phone: this.infoForm.value.phone,
        address: this.infoForm.value.address,
        province: this.infoForm.value.province,
        district: this.infoForm.value.district,
        ward: this.infoForm.value.ward,
        notes: this.infoForm.value.notes,
        paymentMethod: this.selectedPaymentMethod,
        shippingMethod: this.selectedShipping,
        total: this.cart.total + this.selectedShipping.fee,
      });
      console.log(this.orderForm.value);
      this.orderService.placeOrder(this.orderForm.value).subscribe({
        next:data=>{
          this.order = data;
          console.log(this.order);
          if(this.selectedPaymentMethod === 'COD'){
            this.onCodCallback(this.order.orderCode);
            this.cartItemService.cartItemsBehavior.next([]);
          }else if(this.selectedPaymentMethod === 'MOMO'){
            this.orderService.placeMomoOrder(this.order).subscribe({
              next:data=>{
                console.log(data);
                window.location.href = data.payUrl;
                this.cartItemService.cartItemsBehavior.next([]);
              },
              error:err=>{console.log(err)}
            })
          }else if(this.selectedPaymentMethod === 'VNPAY'){
            this.orderService.placeVNPayOrder(this.order).subscribe({
              next:data=>{
                console.log(data);
                window.location.href = data.paymentUrl;
                this.cartItemService.cartItemsBehavior.next([]);
              },
              error:err=>{console.log(err)}
            })
          }
        },
        error:err=>{console.log(err)}
      })
    }
  }

}
