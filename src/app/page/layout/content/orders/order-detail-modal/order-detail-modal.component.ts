import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDto} from "../../../../../shared/dto/order-dto";
import {OrderDetailDto} from "../../../../../shared/dto/order-detail-dto";
import {OrderService} from "../../../../../service/order.service";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-oder-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit{
  orderDetails:OrderDetailDto[] =[]
  disabled = false;
  spin = false
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

  exportAsPDF() {
    this.spin = true;
    this.disabled = true;
    const data = document.getElementById('pdfConvert');  //Id of the table
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jspdf('p', 'mm', 'a4', true); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      pdf.save(this.data.orderCode); // Generated PDF
      this.spin = false;
      this.disabled = false;
    });
  }

  onSubmit(){
    console.log(this.data)
  }

}
