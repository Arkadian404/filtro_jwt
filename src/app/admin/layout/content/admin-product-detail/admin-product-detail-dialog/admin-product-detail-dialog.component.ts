import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryService} from "../../../../../service/category.service";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../../../shared/models/product/category";
import {ProductDetailService} from "../../../../../service/product-detail.service";
import {ProductDetail} from "../../../../../shared/models/product/product-detail";
import {Product} from "../../../../../shared/models/product/product";
import {ProductService} from "../../../../../service/product.service";

@Component({
  selector: 'app-admin-product-detail-dialog',
  templateUrl: './admin-product-detail-dialog.component.html',
  styleUrls: ['./admin-product-detail-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminProductDetailDialogComponent implements OnInit{
  form:FormGroup<any>;
  categories:Category[] = [];
  products:Product[] = []
  selectedCategory:Category;
  constructor(private formBuilder:FormBuilder,
              private productDetailService:ProductDetailService,
              private productService:ProductService,
              private categoryService:CategoryService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminProductDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.getCategories();
    this.form = this.formBuilder.group({
      product: '',
      weight: '',
      quantity: '',
      price: '',
      status: true
    });
    if(this.data){
      this.form.reset();
      this.form.patchValue(this.data);
      this.selectedCategory = this.data.product.category;
      this.onCategoryChange(this.selectedCategory);
      console.log(this.data);
    }
  }

  getCategories(){
    return this.categoryService.getAdminCategoryList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.categories = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  onCategoryChange(selectedCategory:Category){
    this.productService.getAdminProductsByCategory(selectedCategory.id).subscribe(
      {
        next:(data)=>{
          this.products = data
          console.log(data);
        },
        error: err=>{
          this.products = [];
          console.log(err);
        }
      }
    )
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.productDetailService.update(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }else{
        this.productDetailService.create(this.form.value).subscribe({
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
  public compareObjectFn = function (object, value):boolean{
    return object.id === value.id;
  }
}
