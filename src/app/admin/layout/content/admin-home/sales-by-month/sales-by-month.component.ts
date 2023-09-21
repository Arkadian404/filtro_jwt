import { Component } from '@angular/core';
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.scss']
})
export class SalesByMonthComponent {
  chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title:{
      text:'Sales by Month'
    },
    xAxis:{
      categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    },
    yAxis:{
      title:{
        text: 'Revenue in $'
      }
    },
    series:[{
      name: 'Arizona',
      type: 'line',
      data: [70, 69, 153, 254, 182, 181, 147, 133, 111, 100, 90, 80]
    },{
      name: 'California',
      type: 'line',
      data: [50, 49, 83, 181, 152, 151, 117, 103, 81, 70, 60, 50]
    },{
      name: 'Nevada',
      type: 'line',
      data: [30, 29, 53, 81, 52, 51, 17, 13, 55, 71, 100, 121]
    },{
      name: 'New Mexico',
      type: 'line',
      data: [10, 9, 13, 31, 22, 21, 17, 13, 11, 10, 10, 10]
    },{
      name: 'Texas',
      type: 'line',
      data: [10, 9, 13, 31, 22, 21, 17, 13, 11, 10, 10, 10]
    }],
    credits:{
      enabled: false
    }
  })
}
