import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BrandService} from "../../../../../service/brand.service";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminCategoryDialogComponent} from "../../admin-category/admin-category-dialog/admin-category-dialog.component";

@Component({
  selector: 'app-admin-brand-dialog',
  templateUrl: './admin-brand-dialog.component.html',
  styleUrls: ['./admin-brand-dialog.component.scss', "../../reusable/dialog.scss"]
})
export class AdminBrandDialogComponent implements OnInit{
  form:FormGroup<any>;

  constructor(private formBuilder:FormBuilder,
              private brandService:BrandService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      description: '',
      status: true
    });
    if(this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.brandService.updateBrand(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        });
      }else{
        this.brandService.createBrand(this.form.value).subscribe({
          next:() => {
            this.utilService.openSnackBar('Thêm thành công', 'Đóng');
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





}
