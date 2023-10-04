import {AfterViewInit, Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from "../../../../service/search.service";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../../service/product.service";
import {ProductDetailService} from "../../../../service/product-detail.service";
import {ProductImageService} from "../../../../service/product-image.service";
import {Product} from "../../../../shared/models/product/product";
import {ProductDto} from "../../../../shared/dto/product-dto";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchValue = '';
  products:ProductDto[] = []

  constructor(private activatedRoute: ActivatedRoute,
              private searchService:SearchService) {
  }

  ngOnInit(): void {
    this.searchService.searchResults$.subscribe({
        next: data=> {
          this.searchValue = data;
          if(this.searchValue !== this.activatedRoute.snapshot.queryParams.query){
            this.getSearchResult(this.searchValue);
          }
        },
        error: err=> {
          console.log(err)
        }
      });
      this.searchValue = this.activatedRoute.snapshot.queryParams.query;
      this.getSearchResult(this.searchValue);
    }
    getSearchResult(searchValue:string){
      this.searchService.getSearchResult(searchValue).subscribe({
        next: data=> {
          this.products = data;
          console.log(this.products.length)
        },
        error: err=> {
          this.products = [];
          console.log(err)
          // this.products$ = of([]);
      }
  })
    }
}
