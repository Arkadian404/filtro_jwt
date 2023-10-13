import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../../shared/models/page";
import {ProductDto} from "../../../../../shared/dto/product-dto";
import {BrandDto} from "../../../../../shared/dto/brand-dto";
import {CategoryDto} from "../../../../../shared/dto/category-dto";
import {FlavorDto} from "../../../../../shared/dto/flavor-dto";
import {ProductOriginDto} from "../../../../../shared/dto/product-origin-dto";
import {VendorDto} from "../../../../../shared/dto/vendor-dto";
import {ProductFilter} from "../../../../../shared/utils/product-filter";
import {ProductService} from "../../../../../service/product.service";
import {BrandService} from "../../../../../service/brand.service";
import {CategoryService} from "../../../../../service/category.service";
import {FlavorService} from "../../../../../service/flavor.service";
import {ProductOriginService} from "../../../../../service/product-origin.service";
import {VendorService} from "../../../../../service/vendor.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-instant-coffee',
  templateUrl: './instant-coffee.component.html',
  styleUrls: ['../collection.component.scss']
})
export class InstantCoffeeComponent implements OnInit{

  isError = false;
  isLoading = true;
  page:Page;
  products:ProductDto[];
  number= 0;
  sort = "";
  flavor = "";
  brand = "";
  category = "";
  origin = "";
  vendor = "";
  totalPages:Array<number> = [];

  brands:BrandDto[] =[];
  categories:CategoryDto[] = [];
  flavors: FlavorDto[] = [];
  origins: ProductOriginDto[] = [];
  vendors: VendorDto[] = [];

  filters: ProductFilter = {
    brandFilter:[],
    categoryFilter:[],
    flavorFilter:[],
    originFilter:[],
    vendorFilter:[],
  }
  constructor(private productService:ProductService,
              private brandService:BrandService,
              private categoryService:CategoryService,
              private flavorService:FlavorService,
              private originService:ProductOriginService,
              private vendorService:VendorService,
              private activatedRoute:ActivatedRoute,
              private router:Router){
  }

  ngOnInit(): void {
    this.initial();
    this.sort = this.activatedRoute.snapshot.queryParams.sort;
    this.flavor = this.activatedRoute.snapshot.queryParams.flavor;
    this.activatedRoute.queryParams.subscribe(
      {
        next:(params)=>{
          this.assignParam(params);
          this.getProducts(this .number, this.sort, this.flavor, this.category, this.brand, this.origin, this.vendor);
        },
        error:(err)=>{
          console.log(err);
        },
      }
    )
  }

  initial(){
    this.getBrands();
    this.getCategories();
    this.getFlavors();
    this.getOrigins();
    this.getVendors();
  }

  assignParam(params:any){
    this.number = parseInt(params['page']) ? parseInt(params['page']) : 0;
    this.flavor = params['flavor'] ? params['flavor'] : "";
    this.brand = params['brand'] ? params['brand'] : "";
    this.category = params['category'] ? params['category'] : "";
    this.origin = params['origin'] ? params['origin'] : "";
    this.vendor = params['vendor'] ? params['vendor'] : "";
  }

  getProducts(page?:number, sort?:string, flavor?:string, category?:string, brand?:string, origin?:string, vendor?:string){
    return this.productService.getInstantCoffeeListPaging(page, sort, flavor, category, brand, origin, vendor)
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.page = data;
          this.products = data.content;
          this.totalPages = Array(data.totalPages).fill(0).map((x,i)=>i+1);
          this.isLoading = false
          this.isError = false;
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false
          this.isError = true;
        }
      })
  }

  goToPreviousPage(){
    let currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    if(currentPage > 0){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage - 1},
          queryParamsHandling: 'merge',
        })
    }
  }

  goToNextPage(){
    let currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    if(currentPage <= this.page.totalPages - 1){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage + 1},
          queryParamsHandling: 'merge',
        })
    }
  }

  onRadioChange(event:any){
    console.log(event.value);
    this.sort = event.value;
    this.router.navigate(
      [],{
        relativeTo: this.activatedRoute,
        queryParams:{sort: this.sort},
        queryParamsHandling: 'merge',
      })
  }

  onTagChange(page:number){
    console.log(this.page.totalPages);
    console.log(this.sort)
    // this.sort = this.activatedRoute.snapshot.queryParams.sort
    this.router.navigate(
      [],{
        relativeTo: this.activatedRoute,
        queryParams:{page: page},
        queryParamsHandling: 'merge',
      })
  }

  getBrands(){
    this.brandService.getBrandList().subscribe({
      next:(data)=>{
        this.brands = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getCategories(){
    this.categoryService.getCategoryList().subscribe({
      next:(data)=>{
        this.categories = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getFlavors(){
    this.flavorService.getFlavorList().subscribe({
      next:(data)=>{
        this.flavors = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getOrigins(){
    this.originService.getProductOriginList().subscribe({
      next:(data)=>{
        this.origins = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getVendors(){
    this.vendorService.getVendorList().subscribe({
      next:(data)=>{
        this.vendors = data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onBrandChange(event:any){
    if(event.checked){
      this.filters.brandFilter.push(event.source.value);
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams:{brand: this.filters.brandFilter},
          queryParamsHandling: 'merge',
        }
      )
    }else{
      this.filters.brandFilter = this.filters.brandFilter.filter(value => {
        return value != event.source.value;
      });
      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams:{brand: this.filters.brandFilter},
          queryParamsHandling: 'merge',
        })
    }
  }

  onFlavorChange(event:any){
    if(event.checked){
      this.filters.flavorFilter.push(event.source.value);
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams:{flavor: this.filters.flavorFilter},
          queryParamsHandling: 'merge',
        }
      )
    }else{
      this.filters.flavorFilter = this.filters.flavorFilter.filter(value => {
        return value != event.source.value;
      })
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams:{flavor: this.filters.flavorFilter},
          queryParamsHandling: 'merge',
        }
      )
    }
  }

  onOriginChange(event:any){
    if(event.checked){
      this.filters.originFilter.push(event.source.value);
      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams:{origin: this.filters.originFilter},
          queryParamsHandling: 'merge',
        })
    }else{
      this.filters.originFilter = this.filters.originFilter.filter(value => {
        return value != event.source.value;
      });
      this.router.navigate([],{
        relativeTo: this.activatedRoute,
        queryParams:{origin: this.filters.originFilter},
        queryParamsHandling: 'merge',
      })
    }
  }

  onVendorChange(event:any){
    if(event.checked){
      this.filters.vendorFilter.push(event.source.value);
      this.router.navigate([],
        {
          relativeTo: this.activatedRoute,
          queryParams:{vendor: this.filters.vendorFilter},
          queryParamsHandling: 'merge',
        })
    }else {
      this.filters.vendorFilter = this.filters.vendorFilter.filter((value)=>{
        return value != event.source.value;
      });
      this.router.navigate([],{
        relativeTo: this.activatedRoute,
        queryParams:{vendor: this.filters.vendorFilter},
        queryParamsHandling: 'merge',
      })
    }
  }

}
