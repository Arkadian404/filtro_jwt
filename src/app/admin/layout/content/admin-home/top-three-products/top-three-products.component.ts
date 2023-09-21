import { Component } from '@angular/core';
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-top-three-products',
  templateUrl: './top-three-products.component.html',
  styleUrls: ['./top-three-products.component.scss']
})
export class TopThreeProductsComponent {
  chart = new Chart({
    chart: {
      type: 'bar',
      height: 225
    },
    title:{
      text:'Top Three Products'
    },
    xAxis:{
      categories:['Product 1','Product 2','Product 3']
    },
    yAxis:{
      title:{
        text: ''
      }
    },
    series:[{
      type: 'bar',
      showInLegend:false,
      data: [{name:'Electronics',y: 50},{name:'Clothing',y: 20},{name:'Food',y: 10}]
    }],
    credits:{
      enabled: false
    }
  })
}
