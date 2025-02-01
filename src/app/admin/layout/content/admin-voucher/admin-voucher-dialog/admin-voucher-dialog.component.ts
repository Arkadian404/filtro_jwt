import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VoucherService} from "../../../../../service/voucher.service";
import {Category} from "../../../../../shared/models/product/category";
import {CategoryService} from "../../../../../service/product/category.service";
import {CategoryResponse} from "../../../../../shared/response/category-response";
import {VoucherResponse} from "../../../../../shared/response/voucher-response";

@Component({
  selector: 'app-admin-voucher-dialog',
  templateUrl: './admin-voucher-dialog.component.html',
  styleUrls: ['./admin-voucher-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminVoucherDialogComponent implements OnInit{
  categories: CategoryResponse[] = [];
  form:FormGroup<any>;

  constructor(private formBuilder:FormBuilder,
              private categoryService:CategoryService,
              private voucherService:VoucherService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminVoucherDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:VoucherResponse) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      discount: ['', Validators.required],
      expirationDate: ['', Validators.required],
      description: [''],
      categoryId: [''],
    });
    if(this.data){
      this.form.patchValue({
        name: this.data.name,
        discount: this.data.discount,
        expirationDate: this.data.expirationDate,
        description: this.data.description,
        categoryId: this.data.category?.id
      });
      console.log(this.data);
    }
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAdminCategoryList().subscribe({
      next:(data)=>{
        this.categories = data;
      },
      error:(err)=>{
        this.categories = []
        this.utilService.openSnackBar(err, 'Đóng');
      }
    });
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.voucherService.updateVoucher(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar(data, 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        });
      }else{
        if(this.form.value.category === ""){
          this.form.patchValue({categoryId: null});
        }
        this.voucherService.createVoucher(this.form.value).subscribe({
          next:(data) => {
            this.utilService.openSnackBar(data, 'Đóng');
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

  onCategoryChange(event:any){
    const category = event.source._value;
    if(category === ""){
      this.form.patchValue({categoryId: null});
    }
  }

  public compareObjectFunction = function (object, value):boolean{
    if (object == null || value == null){
      return !!"''"
    }
    return object === value;
  }

}
