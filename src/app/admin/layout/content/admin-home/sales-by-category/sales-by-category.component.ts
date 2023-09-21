import { Component } from '@angular/core';
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-sales-by-category',
  templateUrl: './sales-by-category.component.html',
  styleUrls: ['./sales-by-category.component.scss']
})
export class SalesByCategoryComponent {
  chart = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title:{
      text:'Sales by Category'
    },
    xAxis:{
      categories:['Electronics','Clothing','Food','Furniture','Toys']
    },
    yAxis:{
      title:{
        text: 'Revenue in %'
      }
    },
    series:[{
      type: 'pie',
      data: [{name:'Electronics',y: 50},{name:'Clothing',y: 20},{name:'Food',y: 10},{name:'Furniture',y: 10},{name:'Toys',y: 10}]
    }],
    credits:{
      enabled: false
    }
  })
}
