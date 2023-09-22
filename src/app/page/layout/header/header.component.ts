import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../../service/search.service";
import {Router} from "@angular/router";
import {DropdownHoverDirective } from "../../dropdown-hover.directive";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLogin = false;
  searchValue = '';
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private searchService:SearchService,
              private router:Router){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      search: ['']
    })
  }

  onSearch(){
    this.searchValue = this.form.value.search;
    this.searchService.setSearchValue(this.searchValue);
    this.router.navigate(['/search'], {queryParams: {query: this.searchValue}});
    console.log(this.searchValue);
  }
}
