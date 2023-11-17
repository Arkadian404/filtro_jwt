import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../../../service/order.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cod-callback',
  templateUrl: './cod-callback.component.html',
  styleUrls: ['./cod-callback.component.scss']
})
export class CodCallbackComponent implements OnInit{
  showPaymentResult = false;
  orderCode:string;
  constructor(private activatedRoute:ActivatedRoute,
              private router:Router){
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params=> {
      if (params.orderCode) {
        this.orderCode = params.orderCode;
        this.showPaymentResult = true;
      }
    })
  }

  navigateHome(){
    this.router.navigate(['/'])
  }

}
