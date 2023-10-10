import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../../../shared/models/page";
import {ProductDto} from "../../../../../shared/dto/product-dto";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['../collection.component.scss']
})
export class AllComponent implements OnInit{
  isLoading = true;
  page:Page;
  products:ProductDto[];
  number= 0;
  sort = "";
  totalPages:Array<number> = [];
  constructor(private productService:ProductService,
              private activatedRoute:ActivatedRoute,
              private router:Router){
  }

  ngOnInit(): void {
    this.sort = this.activatedRoute.snapshot.queryParams.sort
    console.log(this.sort)
    this.activatedRoute.queryParams.subscribe(
      {
        next:(params)=>{
          let newPage = parseInt(params['page']);
          if(isNaN(newPage) || newPage < 0){
            newPage = 0;
          }
          this.number = newPage;
          console.log(this.sort);
          this.getProducts(this.number, this.sort);
        },
        error:(err)=>{
          console.log(err);
        },
      }
    )
  }

  getProducts(page:number=0, sort?:string){
    return this.productService.getProductListPaging(page, sort)
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.page = data;
          this.products = data.content;
          this.totalPages = Array(data.totalPages).fill(0).map((x,i)=>i+1);
          this.isLoading = false
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false
        }
      })
  }

  goToPreviousPage(){
    let currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    console.log(this.page.totalPages);
    this.sort = this.activatedRoute.snapshot.queryParams.sort

    if(currentPage > 0){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage - 1, sort: this.sort},
          queryParamsHandling: 'merge',
        })
    }
  }

  goToNextPage(){
    let currentPage = parseInt(this.number.toString()); //bang 1 cach nao do cai cu lol nay la string????
    console.log(this.page.totalPages);
    console.log(this.sort)
    this.sort = this.activatedRoute.snapshot.queryParams.sort
    if(currentPage <= this.page.totalPages - 1){
      this.router.navigate(
        [],{
          relativeTo: this.activatedRoute,
          queryParams:{page: currentPage + 1, sort: this.sort},
          queryParamsHandling: 'merge',
        })
    }
  }

  onRadioChange(event:any){
    console.log(event.value);
    this.sort = event.value;
    let currentPage = parseInt(this.number.toString());
    this.router.navigate(
      [],{
        relativeTo: this.activatedRoute,
        queryParams:{page: currentPage, sort: this.sort},
        queryParamsHandling: 'merge',
      })
  }
}
