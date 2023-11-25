import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminCategoryDialogComponent} from "../../admin-category/admin-category-dialog/admin-category-dialog.component";
import {OrderService} from "../../../../../service/order.service";
import {OrderDetail} from "../../../../../shared/models/order-detail";

@Component({
  selector: 'app-admin-order-dialog',
  templateUrl: './admin-order-dialog.component.html',
  styleUrls: ['./admin-order-dialog.component.scss']
})
export class AdminOrderDialogComponent {
  form:FormGroup<any>;
  orderDetails: OrderDetail[] = [];
  status =['PENDING', 'PAID_MOMO', 'PAID_VNPAY', 'CONFIRMED', 'CANCELED', 'FAILED'];

  constructor(private formBuilder:FormBuilder,
              private orderService:OrderService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminCategoryDialogComponent>,
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
        this.orderService.updateAdminOrder(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar(data.message, 'Đóng')
            this.matDialog.close(true);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        });
      }
    }
  }

  public compareObjectFunction =  (value1, value2) =>{
    return value1 == value2;
  }
}
