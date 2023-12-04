import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminCategoryDialogComponent} from "../../admin-category/admin-category-dialog/admin-category-dialog.component";
import {OrderService} from "../../../../../service/order.service";
import {OrderDetail} from "../../../../../shared/models/order-detail";
import {EmailService} from "../../../../../service/email.service";
import {delay} from "rxjs";

interface status{
  value: any ;
  viewValue: any;
}

@Component({
  selector: 'app-admin-order-dialog',
  templateUrl: './admin-order-dialog.component.html',
  styleUrls: ['./admin-order-dialog.component.scss']
})

export class AdminOrderDialogComponent implements OnInit{
  form:FormGroup<any>;
  isLoading:boolean = false;
  orderDetails: OrderDetail[] = [];
  status: status[] =[{
    value: 'PENDING',
    viewValue: 'Đang chờ xử lý'
  },{
    value: 'PAID_MOMO',
    viewValue: 'Đã thanh toán qua Momo'
  },{
    value: 'PAID_VNPAY',
    viewValue: 'Đã thanh toán qua VNPay'
  },{
    value: 'CONFIRMED',
    viewValue: 'Xác nhận đơn hàng'
  },{
    value: 'CANCELED',
    viewValue: 'Đã hủy'
  },{
    value: 'FAILED',
    viewValue: 'Thanh toán thất bại'
  }];

  @ViewChild("orderMail") orderMail: ElementRef;

  constructor(private formBuilder:FormBuilder,
              private orderService:OrderService,
              private utilService:UtilService,
              private emailService:EmailService,
              private matDialog:MatDialogRef<AdminCategoryDialogComponent>,
              private elementRef: ElementRef,
              @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      status: '',
    });
    if(this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
    this.getOrderDetails();
  }



  getOrderDetails(){
    this.orderService.getAdminOrderDetailByOrderId(this.data.id).subscribe(orderDetails=>{
      this.orderDetails = orderDetails;
      console.log(orderDetails)
    })
  }

  onStatusChange(event:any){
    const status = event.source._value;
    console.log(status);
    this.form.patchValue({status: status});
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        if(this.data.status == this.form.value.status){
          this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
          this.matDialog.close(true);
        }else{
          this.orderService.updateAdminOrder(this.data.id, this.form.value).subscribe({
            next:(data)=>{
              if(this.data.status !== 'CONFIRMED' && this.form.value.status == 'CONFIRMED'){
                this.isLoading = true;
                this.emailService.sendOrderMail(this.data.email, this.orderMail.nativeElement.innerHTML).subscribe({
                  next:(data)=>{
                    this.utilService.openSnackBar(data.message, 'Đóng')
                    this.isLoading = false;
                  },
                  error:(err)=>{
                    this.utilService.openSnackBar(err, 'Đóng');
                    this.isLoading = false;
                  }
                });
              }
              this.utilService.openSnackBar(data.message, 'Đóng');
              this.matDialog.close(true);
            },
            error:(err)=>{
              this.utilService.openSnackBar(err, 'Đóng');
            }
          });
        }
      }
    }
  }

  getOrderQuantity(orderDetails:OrderDetail[]){
    return orderDetails.map(orderDetail => orderDetail.quantity).reduce((a,b)=> a+b, 0);
  }




  public compareObjectFunction =  (value1, value2) =>{
    return value1 == value2;
  }
}
