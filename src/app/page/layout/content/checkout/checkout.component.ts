import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user/user.service";
import {UserDto} from "../../../../shared/dto/user-dto";
import {of, switchMap, tap} from "rxjs";
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
import {GhnProvince} from "../../../../shared/models/ghn/ghn-province";
import {GhnDistrict} from "../../../../shared/models/ghn/ghn-district";
import {GhnWard} from "../../../../shared/models/ghn/ghn-ward";
import {GhnService} from "../../../../service/ghn.service";
import {GhnDeliveryService} from "../../../../shared/models/ghn/ghn-delivery-service";

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
  deliveryServices:GhnDeliveryService[] = [];
  selectedService:GhnDeliveryService;
  shippingFee = 0;
  user:UserDto;
  dataJson = data;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  _provinces: GhnProvince[] = [];
  _districts: GhnDistrict[] = [];
  _wards: GhnWard[] = [];
  voucher:Voucher;
  voucherForm:FormGroup;
  discountFee:number = 0;
  isVoucherExpired = false;


  // baseFees = [{
  //   weight: 100,
  //   fees: [8000, 12000, 13000, 14000]
  // },{
  //   weight: 250,
  //   fees: [10000, 16000, 18000, 23000]
  // },{
  //   weight: 500,
  //   fees: [12000, 23000, 25000, 30000]
  // },{
  //   weight: 1000,
  //   fees: [16000, 33000, 35000, 44000]
  // },{
  //   weight: 1500,
  //   fees: [19000, 40000, 42000, 57000]
  // },{
  //   weight: 2000,
  //   fees: [22000, 47000, 49000, 70000]
  // }]

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cartItemService:CartItemService,
              private orderService:OrderService,
              private utilService: UtilService,
              private userDialogService:UserDialogService,
              private voucherService:VoucherService,
              private ghnService:GhnService,
              private router:Router){
  }

  ngOnInit() {
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
      deliveryService: ['', Validators.required],
      shippingFee: [0],
      total: '',
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
      deliveryService:'',
      shippingFee: '',
      total: '',
    });

    this.voucherForm = this.formBuilder.group({
      code:['']
    });
    // this.getShippingMethods();
    this.getUser();
  }






  onPChange(event: any){
    if(event){
      console.log(event);
      this.getDist(event.ProvinceID).subscribe(data=>{
        this._districts = data;
        console.log(this._districts);
      });
    }
  }

  onDChange(event: any){
    if(event){
      this.getWard(event.DistrictID).subscribe(data=>{
        this._wards = data;
        console.log(this._wards);
        if(this.shippingFee != 0) this.shippingFee = 0;
        this.getServices(event.DistrictID);
      });
    }
  }

  onWChange(event:any){
    console.log(event);
  }



  getUser() {
    this.isLoading = true;
    this.getProv().pipe(
      tap(prov => this._provinces = prov),
      switchMap(() => this.userService.currentUser()),
      tap(user => this.user = user),
      switchMap(user => {
        if (user) {
          const province = this._provinces.find(p => p.ProvinceName === user.province) ?? null;
          if(province){
            return this.getDist(province.ProvinceID).pipe(
              switchMap((districts) => {
                this._districts = districts;
                const district = this._districts.find(d => d.DistrictName === user.district) ?? null;
                if(district){
                  return this.getWard(district.DistrictID).pipe(
                    switchMap((wards) => {
                        this._wards = wards;
                        return this.ghnService.getDeliveryService(district.DistrictID);
                      }
                    )
                  )
                }else{
                  return of(null);
                }
              })
            )
          }else{
            return of(null);
          }
        } else {
          return of(null); // Return a null observable if user is null
        }
      })
    ).subscribe({
      next: (data) => {
          this.deliveryServices = data;
          this.infoForm.patchValue({
            fullName: this.user.firstname + ' ' + this.user.lastname,
            email: this.user.email,
            phone: this.user.phone,
            address: this.user.address,
            province: this._provinces.find(p => p.ProvinceName === this.user.province)??null,
            district: this._districts.find(d => d.DistrictName === this.user.district)??null,
            ward: this._wards.find(w => w.WardName === this.user.ward)??null,
          });
          this.cartItemService.getCart(this.user.username).subscribe(cart => {
            this.cart = cart;
            this.voucher = cart.voucher;
            this.cartItemService.getCartItems(this.cart.id).subscribe(cartItems => {
              this.cartItems = cartItems;
              if (this.voucher?.category != null) {
                this.discountFee = this.cartItems.filter(item => item.productDetail.categoryId === this.voucher?.category?.id).reduce((sum, item) => sum + item.total, 0);
              } else {
                this.discountFee = this.cartItems.reduce((sum, item) => sum + item.total, 0);
              }
              this.isLoading = false;
            })
          });
      },
      error: (err) => {
        console.log(err)
        this.isLoading = false;
      }
    });
  }


  getProv(){
    return this.ghnService.getProvinces().pipe(
      tap(data=>{
        this._provinces = data;
      })
    );
  }

  getDist(provinceId:number){
    return this.ghnService.getDistricts(provinceId).pipe(
      tap(data=>{
        this._districts = data;
      })
    );
  }

  getWard(districtId:number){
    return this.ghnService.getWards(districtId).pipe(
      tap(data=>{
        this._wards = data;
      })
    );
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
        province: this.infoForm.value.province.ProvinceName,
        district: this.infoForm.value.district.DistrictName,
        ward: this.infoForm.value.ward.WardName,
        notes: this.infoForm.value.notes,
        paymentMethod: this.selectedPaymentMethod,
        deliveryService: this.selectedService.short_name,
        shippingFee: this.shippingFee,
        total: this.cart.total + this.shippingFee,
      });
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

  checkVoucherExpirationDate(voucherId:number){
    return this.voucherService.checkVoucherExpirationDate(voucherId);
  }

  onServiceChange(event:any){
    this.selectedService = event.value;
    const serviceId = this.selectedService.service_id;
    const serviceTypeId = this.selectedService.service_type_id;
    const endpointDistrictId = this.infoForm.value.district.DistrictID;
    const endpointWardCode = this.infoForm.value.ward.WardCode;
    const productsWeight = this.cartItems.reduce((sum, item)=> sum + item.productDetail.weight * item.quantity, 0);
    // console.log(this.selectedService);
    // console.log(this.infoForm.value.district.DistrictID);
    // console.log(this.infoForm.value.ward.WardCode);
    // console.log(productsWeight);
    this.calculateFee(serviceId, serviceTypeId,endpointDistrictId, endpointWardCode, productsWeight);
    console.log(event)

  }

  getServices(districtId:number){
    return this.ghnService.getDeliveryService(districtId).subscribe(data=>{
      this.deliveryServices = data;
    })
  }

  calculateFee(serviceId:number, serviceTypeId:number ,endpointDistrictId:number, endpointWardCode:number, productsWeight:number){
    this.ghnService.calculateShippingFee(serviceId,serviceTypeId, endpointDistrictId, endpointWardCode, productsWeight).subscribe({
      next:data=>{
        this.shippingFee = data.total;
      },
      error:err=>{
        this.utilService.openSnackBar("Bảng giá hiện tại không có sẵn, vui lòng chọn khác", 'Đóng');
        console.log(err);
      }
    });
  }

}
