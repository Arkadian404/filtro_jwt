import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDto} from "../../../../../shared/dto/order-dto";
import {OrderDetailDto} from "../../../../../shared/dto/order-detail-dto";
import {OrderService} from "../../../../../service/order.service";

@Component({
  selector: 'app-oder-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit{
  orderDetails:OrderDetailDto[] =[]
  constructor(private dialogRef:MatDialogRef<OrderDetailModalComponent>,
              private orderService:OrderService,
              @Inject(MAT_DIALOG_DATA) public data: OrderDto) {
  }

  ngOnInit(): void {
    this.getOrderDetails();
  }


  getOrderDetails(){
    this.orderService.getOrderDetailByOrderId(this.data.id).subscribe(orderDetails=>{
      this.orderDetails = orderDetails;
      console.log(orderDetails)
    })
  }

  getDate(data:any){
    return data.slice(0, 10);
  }

  getTime(data:any){
    return data.slice(10, 19);
  }

}
