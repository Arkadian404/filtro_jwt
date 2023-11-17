import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-momo-callback',
  templateUrl: './momo-callback.component.html',
  styleUrls: ['./momo-callback.component.scss']
})
export class MomoCallbackComponent  implements OnInit{
  showPaymentResult = false;
  isSuccessful = false;
  message:string;
  orderCode:string;
  timestamp:string;
  amount:number;
  constructor(private router:Router,
              private activatedRoute:ActivatedRoute) {
  }


  ngOnInit(){
    this.activatedRoute.queryParams.subscribe(params=>{
      if(params.resultCode == 0){
        this.showPaymentResult = true;
        this.isSuccessful = true;
        this.orderCode = params.orderId;
        this.message = "Thanh toán thành công";
        this.timestamp = params.responseTime;
        this.amount = Number.parseInt(params.amount);
      } else if (params.resultCode == 1005 || params.resultCode == 1006){
        this.showPaymentResult = true;
        this.isSuccessful = false;
        this.orderCode = params.orderId;
        this.message =  params.message;
        this.timestamp = params.responseTime;
        this.amount = Number.parseInt(params.amount);
      }else{
        this.showPaymentResult = false;
      }
    })

  }

  navigateHome(){
    this.router.navigate(['/']);
  }

}
