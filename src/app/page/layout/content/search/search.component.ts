import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SearchService} from "../../../../service/search.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  searchValue = '';
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchValue = this.activatedRoute.snapshot.queryParams.query;
  }
}
