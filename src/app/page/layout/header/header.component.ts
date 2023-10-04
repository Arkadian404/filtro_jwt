import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../../service/search.service";
import {Router} from "@angular/router";
import {Category} from "../../../shared/models/product/category";
import {CategoryService} from "../../../service/category.service";
import {FlavorService} from "../../../service/flavor.service";
import {Flavor} from "../../../shared/models/product/flavor";
import {ProductOriginService} from "../../../service/product-origin.service";
import {ProductOrigin} from "../../../shared/models/product/product-origin";
import {VendorService} from "../../../service/vendor.service";
import {Vendor} from "../../../shared/models/product/vendor";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() username = '';
  @Output() onLogout = new EventEmitter();
  searchValue = '';
  form:FormGroup;
  categories: Category[] = [];
  flavors:Flavor [] = []
  origins:ProductOrigin[] = [];
  vendors:Vendor[] = [];
  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private originService:ProductOriginService,
              private vendorService:VendorService,
              private searchService:SearchService,
              private router:Router){
  }

  ngOnInit(): void {
    this.getCategories();
    this.getFlavors();
    this.getOrigins();
    this.getVendors();
    this.form = this.formBuilder.group({
      search: ['']
    })
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

  getOrigins(){
    return this.originService.getProductOriginList()
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

  toggleLogout(){
    this.onLogout.emit();
  }


  onSearch(){
    this.searchValue = this.form.value.search;
    this.searchService.searchResults.next(this.searchValue);
    this.router.navigate(['/search'], {queryParams: {query: this.searchValue}});
    console.log(this.searchValue);
  }
}
