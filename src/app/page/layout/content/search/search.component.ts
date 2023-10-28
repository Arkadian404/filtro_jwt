import {AfterViewInit, Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from "../../../../service/search.service";
import {ActivatedRoute} from "@angular/router";
import {ProductDto} from "../../../../shared/dto/product-dto";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  isLoading = true;
  searchValue = '';
  products:ProductDto[] = []

  constructor(private activatedRoute: ActivatedRoute,
              private searchService:SearchService) {
  }

  ngOnInit(): void {
    this.searchService.searchResults$.subscribe({
        next: data=> {
          this.searchValue = this.activatedRoute.snapshot.queryParams.query;
          if(this.searchValue !== this.activatedRoute.snapshot.queryParams.query){
            this.getSearchResult(this.searchValue);
          }
        },
        error: err=> {
          console.log(err)
        }
      });
      this.getSearchResult(this.activatedRoute.snapshot.queryParams.query);
    }
    getSearchResult(searchValue:string){
      this.searchService.getSearchResult(searchValue).subscribe({
        next: data=> {
          this.products = data;
          this.isLoading = false;
        },
        error: err=> {
          this.products = [];
          console.log(err)
          this.isLoading = false;
      }
     })
  }
}
