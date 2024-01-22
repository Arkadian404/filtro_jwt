import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user/user.service";
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
import {UtilService} from "../../../../service/util.service";
import {Voucher} from "../../../../shared/models/voucher";
import {UserDialogService} from "../reusable/user-dialog.service";
import {VoucherService} from "../../../../service/voucher.service";

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
  selectedPaymentMethod = "";
  selectedProvince:Province;
  shippingMethods:ShippingMethodDto[] = [];
  shippingFee = 0;
  user:UserDto;
  dataJson = data;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  voucher:Voucher;
  voucherForm:FormGroup;


  baseFees = [{
    weight: 100,
    fees: [8000, 12000, 13000, 14000]
  },{
    weight: 250,
    fees: [10000, 16000, 18000, 23000]
  },{
    weight: 500,
    fees: [12000, 23000, 25000, 30000]
  },{
    weight: 1000,
    fees: [16000, 33000, 35000, 44000]
  },{
    weight: 1500,
    fees: [19000, 40000, 42000, 57000]
  },{
    weight: 2000,
    fees: [22000, 47000, 49000, 70000]
  }]

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cartItemService:CartItemService,
              private orderService:OrderService,
              private utilService: UtilService,
              private userDialogService:UserDialogService,
              private voucherService:VoucherService,
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
      shippingFee: '',
      total: '',
    });
    this.voucherForm = this.formBuilder.group({
      code:['']
    });
    this.getShippingMethods();
    this.getUser();
  }

  getFeeIndex(province:Province){
    if(province.distance == 0){
      return 0;
    }else if(province.distance <= 100){
      return 1;
    }else if(province.distance <= 300){
      return 2;
    }else{
      return 3;
    }
  }

  baseShippingFee(province:Province, weight:number) {
    let standard:any;
    if(weight <= 2000){
       standard = this.baseFees.find(f => weight <= f.weight);
    }else{
       standard = this.baseFees.find(f => f.weight == 2000);
    }
    const index = this.getFeeIndex(province);
    return standard?.fees[index];
  }

  calculateShippingFee(province:Province, weight:number){
    if(!province){
      return 0;
    }
    console.log('weight: '+weight);
    let tempWeight = 0;
    if(weight < 2000){
      tempWeight = weight;
      return this.baseShippingFee(province, tempWeight);
    }else{
      let shippingFee = this.baseShippingFee(province, tempWeight);
      console.log('calc: '+shippingFee);
      const surplusWeight = Math.floor((weight - 2000) / 500);
      if(surplusWeight > 0){
        let extraFee = 0;
        if(province.distance == 0){
          extraFee = 2000 * surplusWeight;
        }else if( province.distance <= 100){
          extraFee = 4000 * surplusWeight;
        }else if(province.distance <= 300){
          extraFee = 5000 * surplusWeight;
        }else{
          extraFee = 9000 * surplusWeight;
        }
        shippingFee += extraFee;
      }
      return shippingFee;
    }

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
    this.selectedProvince = this.provinces.find(p => p.name === province);
    this.shippingFee = this.calculateShippingFee(this.selectedProvince, this.cartItems.reduce((sum, item)=> sum+ item.productDetail.weight * item.quantity, 0));
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
            this.cartItemService.getCart(data.username).subscribe(cart=>{
              this.cart = cart;
              this.voucher = cart.voucher;
              this.cartItemService.getCartItems(this.cart.id).subscribe(cartItems=>{
                this.cartItems = cartItems;
                this.isLoading = false;
                this.onProvinceChange({source: {_value: data.province}});
                this.onDistrictChange({source: {_value: data.district}});
                this.onWardChange({source: {_value: data.ward}});
              })
            })
          }
        },
        error:err=>{console.log(err)}
      }
    );
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
        shippingFee: this.shippingFee + this.selectedShipping.surcharge,
        total: this.cart.total + this.shippingFee,
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
              error:err=>{
                this.utilService.openSnackBar(err, "Đóng");
                console.log(err)
              }
            })
          }else if(this.selectedPaymentMethod === 'VNPAY'){
            this.orderService.placeVNPayOrder(this.order).subscribe({
              next:data=>{
                console.log(data);
                window.location.href = data.paymentUrl;
                this.cartItemService.cartItemsBehavior.next([]);
              },
              error:err=>{
                this.utilService.openSnackBar(err, "Đóng");
                console.log(err)
              }
            })
          }
        },
        error:err=>{
          this.utilService.openSnackBar(err, "Đóng");
          console.log(err);
        }
      })
    }
  }


  applyVoucher(){
    if(this.voucherForm.valid) {
      this.voucherService.applyVoucher(this.voucherForm.value.code).subscribe({
        next: (data) => {
          this.utilService.openSnackBar(data.message, 'Đóng');
          this.getUser();
        },
        error: (err) => {
          this.utilService.openSnackBar(err, 'Đóng');
        }
      });
      console.log(this.voucherForm.value);
    }
  }

  removeVoucher(id:number){
    this.voucherService.removeVoucher(id).subscribe({
      next: (data) => {
        this.utilService.openSnackBar(data.message, 'Đóng');
        this.getUser();
      },
      error: (err) => {
        this.utilService.openSnackBar(err, 'Đóng');
      }
    });
  }

  openChangeVoucher(data:Voucher){
    this.userDialogService.confirmDialog("Thay đổi voucher", "Bạn có chắc muốn đổi voucher hiện tại?").subscribe(res=>{
      if(data !=null){
        this.removeVoucher(data.id);
      }
    });
  }


}
