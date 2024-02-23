import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../../service/product/product.service";
import {CategoryService} from "../../../../../service/product/category.service";
import {FlavorService} from "../../../../../service/product/flavor.service";
import {SaleService} from "../../../../../service/product/sale.service";
import {Category} from "../../../../../shared/models/product/category";
import {Flavor} from "../../../../../shared/models/product/flavor";
import {Sale} from "../../../../../shared/models/product/sale";
import {VendorService} from "../../../../../service/vendor.service";
import {ProductOriginService} from "../../../../../service/product/product-origin.service";

import {Vendor} from "../../../../../shared/models/product/vendor";
import {ProductOrigin} from "../../../../../shared/models/product/product-origin";
import {Brand} from "../../../../../shared/models/product/brand";
import {BrandService} from "../../../../../service/product/brand.service";




@Component({
  selector: 'app-product-dialog',
  templateUrl: './admin-product-dialog.component.html',
  styleUrls: ['./admin-product-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminProductDialogComponent implements OnInit{
  form: FormGroup;
  brands: Brand[] = [];
  categories:Category[] = [];
  flavors:Flavor[] = [];
  sales:Sale[] = [];
  vendors:Vendor[] = [];
  origins:ProductOrigin[] = [];


  constructor(private formBuilder:FormBuilder,
              private brandService: BrandService,
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
    this.getBrands();
    this.getCategories();
    this.getFlavors();
    this.getSales();
    this.getOrigins();
    this.getVendors();
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      brand:['', Validators.required],
      flavor:['', Validators.required],
      description : ['', Validators.required],
      isSpecial: [false],
      isLimited:[false],
      origin: ['', Validators.required],
      status: [true],
      sale: [''],
      category: ['', Validators.required],
      vendor: ['', Validators.required]
    });
    if (this.data){
      this.form.patchValue(this.data);
    }
  }

  getBrands(){
    return this.brandService.getAdminBrandList()
      .subscribe({
        next:(data)=>{
          this.brands = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getCategories(){
    return this.categoryService.getAdminCategoryList()
      .subscribe({
        next:(data)=>{
          this.categories = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getFlavors(){
    return this.flavorService.getAdminFlavorList()
      .subscribe({
        next:(data)=>{
          this.flavors = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getSales(){
    return this.saleService.getAdminSaleList()
      .subscribe({
        next:(data)=>{
          this.sales = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getVendors(){
    return this.vendorService.getAdminVendorList()
      .subscribe({
        next:(data)=>{
          this.vendors = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  getOrigins(){
    return this.productOriginService.getAdminProductOriginList()
      .subscribe({
        next:(data)=>{
          this.origins = data;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }


  onSubmit(){
    if(this.form.valid){
      if(this.data){
        console.log(this.form.value);
          this.updateProduct();
      }else{
          console.log(this.form.value);
          this.createProduct();
      }
    }
  }



  createProduct(){
    if(this.form.value.sale === ''){
      this.form.patchValue({sale: null});
    } // temporary fix for sale
    this.productService.createProduct(this.form.value).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng')
        this.matDialog.close(true);
      },
      error:(err)=>{
        this.utilService.openSnackBar(err, 'Đóng');
      }
    })
  }

  updateProduct(){
    this.productService.updateProduct(this.data.id, this.form.value).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng')
        this.matDialog.close(true);
        console.log(this.form);
      },
      error:(err)=>{
        this.utilService.openSnackBar(err, 'Đóng');
      }
    })
  }

  onBrandChange(event:any){
    const brand = event.source._value;
    if(brand === "''" || brand === ""){
      this.form.patchValue({brand: null});
    }
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


  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],                                         // remove formatting button
        ['link', 'image']
      ],
    },
  };
}
