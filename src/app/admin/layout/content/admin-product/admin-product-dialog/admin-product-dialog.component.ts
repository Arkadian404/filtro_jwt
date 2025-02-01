import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../../service/product/product.service";
import {CategoryService} from "../../../../../service/product/category.service";
import {FlavorService} from "../../../../../service/product/flavor.service";;
import {VendorService} from "../../../../../service/vendor.service";
import {ProductOriginService} from "../../../../../service/product/product-origin.service";
import {Brand} from "../../../../../shared/models/product/brand";
import {BrandService} from "../../../../../service/product/brand.service";
import {CategoryResponse} from "../../../../../shared/response/category-response";
import {FlavorResponse} from "../../../../../shared/response/flavor-response";
import {VendorResponse} from "../../../../../shared/response/vendor-response";
import {ProductOriginResponse} from "../../../../../shared/response/product-origin-response";
import {BrandResponse} from "../../../../../shared/response/brand-response";
import {ProductResponse} from "../../../../../shared/response/product-response";




@Component({
  selector: 'app-product-dialog',
  templateUrl: './admin-product-dialog.component.html',
  styleUrls: ['./admin-product-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminProductDialogComponent implements OnInit{
  form: FormGroup;
  brands: BrandResponse[] = [];
  categories:CategoryResponse[] = [];
  flavors:FlavorResponse[] = [];
  vendors:VendorResponse[] = [];
  origins:ProductOriginResponse[] = [];


  constructor(private formBuilder:FormBuilder,
              private brandService: BrandService,
              private productService:ProductService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private vendorService:VendorService,
              private productOriginService:ProductOriginService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:ProductResponse
  ){
  }


  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    this.getFlavors();
    this.getOrigins();
    this.getVendors();
    this.form = this.formBuilder.group({
      name : ['', Validators.required],
      brandId:['', Validators.required],
      flavorId:['', Validators.required],
      description : ['', Validators.required],
      isSpecial: [false],
      isLimited:[false],
      originId: ['', Validators.required],
      status: [true],
      categoryId: ['', Validators.required],
      vendorId: ['', Validators.required]
    });
    if (this.data){
      this.form.patchValue({
        name: this.data.name,
        brandId: this.data.brand.id,
        flavorId: this.data.flavor.id,
        description: this.data.description,
        isSpecial: this.data.isSpecial,
        isLimited: this.data.isLimited,
        originId: this.data.productOrigin.id,
        status: this.data.status,
        categoryId: this.data.category.id,
        vendorId: this.data.vendor.id
      });
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
    this.productService.createProduct(this.form.value).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data, 'Đóng')
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
        this.utilService.openSnackBar(data, 'Đóng')
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
      this.form.patchValue({brandId: null});
    }
  }


  onFlavorChange(event:any){
    const flavor = event.source._value;
    if(flavor === "''" || flavor === ""){
      this.form.patchValue({flavorId: null});
    }
  }



  onOriginChange(event:any){
    const origin = event.source._value;
    if(origin === "''" || origin === ""){
      this.form.patchValue({originId: null});
    }
  }

  onCategoryChange(event:any){
    const category = event.source._value;
    if(category === "''" || category === ""){
      this.form.patchValue({categoryId: null});
    }
  }

  onVendorChange(event:any){
    const vendor = event.source._value;
    if(vendor == "''" || vendor === ""){
      this.form.patchValue({vendorId: null});
    }
  }

  public compareObjectFunction = function (object, value):boolean{
    if (object == null || value == null){
      return !!"''"
    }
    return object === value;
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
