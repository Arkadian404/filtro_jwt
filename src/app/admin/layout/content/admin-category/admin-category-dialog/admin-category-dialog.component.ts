import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../../../../shared/models/product/category";
import {CategoryService} from "../../../../../service/product/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../../../service/util.service";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './admin-category-dialog.component.html',
  styleUrls: ['./admin-category-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminCategoryDialogComponent implements OnInit{
  // @ts-ignore
  form:FormGroup<any>;
  constructor(private formBuilder:FormBuilder,
              private categoryService:CategoryService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group<Category>({
      name: '',
      status: false
    });
    if(this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.categoryService.updateCategory(this.data.id, this.form.value).subscribe({
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
      this.categoryService.createCategory(this.form.value).subscribe({
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
}
