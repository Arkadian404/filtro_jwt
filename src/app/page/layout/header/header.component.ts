import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SearchService} from "../../../service/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() username = '';
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
    this.router.navigate(['/search'], {queryParams: {query: this.searchValue}});
    console.log(this.searchValue);
  }
}
