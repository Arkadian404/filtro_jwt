import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../../service/product.service";
import {CategoryService} from "../../../../../service/category.service";
import {FlavorService} from "../../../../../service/flavor.service";
import {SaleService} from "../../../../../service/sale.service";
import {Category} from "../../../../../shared/models/category";
import {Flavor} from "../../../../../shared/models/flavor";
import {Sale} from "../../../../../shared/models/sale";
import {Storage} from "@angular/fire/storage";


import {ProductImage} from "../../../../../shared/models/product-image";
import {Product} from "../../../../../shared/models/product";



@Component({
  selector: 'app-product-dialog',
  templateUrl: './admin-product-dialog.component.html',
  styleUrls: ['./admin-product-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminProductDialogComponent implements OnInit{
  // @ts-ignore
  form: FormGroup;
  categories:Category[] = [];
  flavors:Flavor[] = [];
  sales:Sale[] = [];
  productImages:ProductImage[] = [];
  // @ts-ignore

  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private saleService:SaleService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any
  ){
  }




  ngOnInit(): void {
    this.getCategories();
    this.getFlavors();
    this.getSales();
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      quantity: ['', Validators.required],
      sold: ['', Validators.required],
      price: ['', Validators.required],
      flavor:['', Validators.required],
      description : ['', Validators.required],
      status: false,
      sale: ['', Validators.required],
      category: ['', Validators.required]
    });
    if (this.data){
      this.form.reset();
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }


  getCategories(){
    return this.categoryService.getCategoryList()
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

  getFlavors(){
    return this.flavorService.getFlavorList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.flavors = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getSales(){
    return this.saleService.getSaleList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.sales = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }



  // onSubmit(){
  //   if(this.form.valid){
  //     if(this.data){
  //       this.productService.updateProduct(this.data.id, this.form.value).subscribe({
  //         next:(data)=>{
  //           this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
  //           this.matDialog.close(true);
  //           console.log(this.form);
  //         },
  //         error:(err)=>{
  //           this.utilService.openSnackBar(err, 'Đóng');
  //         }
  //       })
  //     }else{
  //       this.productService.createProduct(this.form.value).subscribe({
  //         next:() => {
  //           this.utilService.openSnackBar('Thêm thành công', 'Đóng');
  //           this.matDialog.close(true);
  //           console.log(this.form)
  //         },
  //         error:(err) => {
  //           this.utilService.openSnackBar(err, 'Đóng');
  //         }
  //       })
  //     }
  //   }
  // }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
          this.updateProduct();
      }else{
          console.log(this.form.value);
          this.createProduct();
      }
    }
  }



  createProduct(){
    this.productService.createProduct(this.form.value).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar('Tạo thành công', 'Đóng')
        this.matDialog.close(true);
        console.log(this.form);
      },
      error:(err)=>{
        this.utilService.openSnackBar(err, 'Đóng');
      }
    })
  }

  updateProduct(){
    this.productService.updateProduct(this.data.id, this.form.value).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
        this.matDialog.close(true);
        console.log(this.form);
      },
      error:(err)=>{
        this.utilService.openSnackBar(err, 'Đóng');
      }
    })
  }

  onFlavorChange(event:any){
    const flavor = event.source._value;
    console.log(flavor);
  }

  onSaleChange(event:any){
    const sale = event.source._value;
    console.log(sale);
  }

  onCategoryChange(event:any){
    const category = event.source._value;
    console.log(category);
  }

  public compareObjectFunction = function (object, value):boolean{
    return object.id === value.id;
  }
}
