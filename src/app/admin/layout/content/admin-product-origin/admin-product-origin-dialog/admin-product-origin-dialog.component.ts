import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductOrigin} from "../../../../../shared/models/product/product-origin";
import {ProductOriginService} from "../../../../../service/product/product-origin.service";

@Component({
  selector: 'app-admin-origin-dialog',
  templateUrl: './admin-product-origin-dialog.component.html',
  styleUrls: ['./admin-product-origin-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminProductOriginDialogComponent implements OnInit{

  form:FormGroup<any>;
  continent = ['Châu Á', 'Châu Âu', 'Châu Mỹ', 'Châu Phi', 'Châu Úc']
  constructor(private formBuilder:FormBuilder,
              private productOriginService:ProductOriginService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminProductOriginDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group<ProductOrigin>({
      name: '',
      continent:'',
      description:''
    });
    if(this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.productOriginService.update(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar(data.message, 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }else{
        this.productOriginService.create(this.form.value).subscribe({
          next:(data) => {
            this.utilService.openSnackBar(data.message, 'Đóng');
            this.matDialog.close(true);
            console.log(this.form)
          },
          error:(err) => {
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }
    }
  }
  compareFn(c1:any, c2:any):boolean{
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }

}
