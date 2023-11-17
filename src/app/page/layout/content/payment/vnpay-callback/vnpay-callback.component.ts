import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-vnpay-callback',
  templateUrl: './vnpay-callback.component.html',
  styleUrls: ['./vnpay-callback.component.scss']
})
export class VnpayCallbackComponent implements OnInit{

  showPaymentResult = false;
  isSuccessful = false;
  message:string;
  orderCode:string;
  timestamp:Date;
  amount:number;
  type:string;

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute) {
  }


  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params=>{
      if(params.vnp_ResponseCode == '00'){
        this.showPaymentResult = true;
        this.isSuccessful = true;
        this.orderCode = params.vnp_TxnRef;
        this.message = "Thanh toán thành công";
        this.timestamp = this.convertStringToDate(params.vnp_PayDate);
        this.amount = Number.parseInt(params.vnp_Amount)/100;
        this.type = params.vnp_BankCode;
      } else if (params.vnp_ResponseCode == '11' || params.vnp_ResponseCode == '24'){
        this.showPaymentResult = true;
        this.isSuccessful = false;
        this.orderCode = params.vnp_TxnRef;
        this.message =  "Thanh toán thất bại";
        this.timestamp = this.convertStringToDate(params.vnp_PayDate);
        this.amount = Number.parseInt(params.vnp_Amount)/100;
        this.type = params.vnp_BankCode;
      }else{
        this.showPaymentResult = false;
      }
    })

  }

  navigateHome(){
    this.router.navigate(['/']);
  }

  convertStringToDate(timestamp:string){
    const date = timestamp;
    const year = Number.parseInt(date.slice(0,4));
    const month =  Number.parseInt(date.slice(4, 6));
    const day =  Number.parseInt(date.slice(6, 8));

    const hour =  Number.parseInt(date.slice(8, 10));
    const minute =  Number.parseInt(date.slice(10, 12));
    const second =  Number.parseInt(date.slice(12, 14));

    return new Date(year, month-1, day, hour, minute, second);
  }
}
