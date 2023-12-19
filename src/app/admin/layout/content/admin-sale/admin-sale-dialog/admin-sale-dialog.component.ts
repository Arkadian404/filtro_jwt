import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SaleService} from "../../../../../service/product/sale.service";
import {Sale} from "../../../../../shared/models/product/sale";

@Component({
  selector: 'app-sale-dialog',
  templateUrl: './admin-sale-dialog.component.html',
  styleUrls: ['./admin-sale-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminSaleDialogComponent implements OnInit{
  // @ts-ignore
  form:FormGroup<any>;
  constructor(private formBuilder:FormBuilder,
              private saleService:SaleService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminSaleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start: new Date(),
      end:new Date(),
      discount: [0, Validators.required],
      status: [false, Validators.required]
    })
    if(this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }


  onSubmit() {
    if (this.form.valid) {
      if (this.data) {
        this.saleService.updateSale(this.data.id, this.form.value).subscribe({
          next: (data) => {
            this.utilService.openSnackBar(data.message, 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error: (err) => {
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      } else {
        this.saleService.createSale(this.form.value).subscribe({
          next: (data) => {
            this.utilService.openSnackBar(data.message, 'Đóng');
            this.matDialog.close(true);
            console.log(this.form)
          },
          error: (err) => {
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }
    }
  }

}
