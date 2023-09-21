import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from "../../../../service/search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchValue = '';
  constructor(private searchService:SearchService) {}

  ngOnInit(): void {
    this.searchService.currentSearchValue.subscribe(searchValue => {
        this.searchValue = searchValue;
    })
  }


}
