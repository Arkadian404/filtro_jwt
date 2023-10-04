import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../../service/product.service";
import {CategoryService} from "../../../../../service/category.service";
import {FlavorService} from "../../../../../service/flavor.service";
import {SaleService} from "../../../../../service/sale.service";
import {Category} from "../../../../../shared/models/product/category";
import {Flavor} from "../../../../../shared/models/product/flavor";
import {Sale} from "../../../../../shared/models/product/sale";
import {VendorService} from "../../../../../service/vendor.service";
import {ProductOriginService} from "../../../../../service/product-origin.service";
import {ProductDetailService} from "../../../../../service/product-detail.service";


import {ProductImage} from "../../../../../shared/models/product/product-image";
import {Vendor} from "../../../../../shared/models/product/vendor";
import {ProductOrigin} from "../../../../../shared/models/product/product-origin";




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
  vendors:Vendor[] = [];
  origins:ProductOrigin[] = [];

  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private saleService:SaleService,
              private vendorService:VendorService,
              private productOriginService:ProductOriginService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any
  ){
  }


  ngOnInit(): void {
    this.getCategories();
    this.getFlavors();
    this.getSales();
    this.getOrigins();
    this.getVendors();
    this.form = this.formBuilder.group({
      name : [''],
      flavor:[''],
      description : [''],
      isSpecial: false,
      origin: [''],
      status: true,
      sale: [''],
      category: [''],
      vendor: ['']
    });
    if (this.data){
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

  getVendors(){
    return this.vendorService.getVendorList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.vendors = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getOrigins(){
    return this.productOriginService.getProductOriginList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.origins = data;
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
    if(flavor === "''" || flavor === ""){
      this.form.patchValue({flavor: null});
    }
  }

  onSaleChange(event:any){
    const sale = event.source._value;
    if(sale === "''" || sale === ""){
      this.form.patchValue({sale: null});
    }
  }

  onOriginChange(event:any){
    const origin = event.source._value;
    if(origin === "''" || origin === ""){
      this.form.patchValue({origin: null});
    }
  }

  onCategoryChange(event:any){
    const category = event.source._value;
    if(category === "''" || category === ""){
      this.form.patchValue({category: null});
    }
  }

  onVendorChange(event:any){
    const vendor = event.source._value;
    if(vendor == "''" || vendor === ""){
      this.form.patchValue({vendor: null});
    }
  }

  public compareObjectFunction = function (object, value):boolean{
    if (object == null || value == null){
      return !!"''"
    }
    return object.id === value.id;
  }
}
