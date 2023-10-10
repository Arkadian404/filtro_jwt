import {Component, OnInit, Renderer2} from '@angular/core';
import {ProductDto} from "../../../../shared/dto/product-dto";
import {ProductService} from "../../../../service/product.service";
import {Page} from "../../../../shared/models/page";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit{
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
  }


}
