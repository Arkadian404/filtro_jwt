import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Chart} from "angular-highcharts";
import {StatisticService} from "../../../../../service/statistic.service";
import {OrderLocationStatistic} from "../../../../../shared/models/statistic/order-location-statistic";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-right-widgets',
  templateUrl: './right-widgets.html',
  styleUrls: ['../admin-home.component.scss']
})
export class RightWidgets implements OnInit{
  orderLocations:OrderLocationStatistic[]=[];
  totalCount = 0;
  date = new Date();

  constructor(private statisticService:StatisticService,
              private render: Renderer2) {
  }

  ngOnInit(): void {
    this.getCurrentMonth();
  }


  getCurrentMonth(){
    this.statisticService.getOrderLocationStatisticByCurrentMonth().subscribe(data=>{
      this.orderLocations = data;
      this.totalCount = this.orderLocations.map(item=> item.count).reduce((prev, next)=> prev+next, 0);
      this.date = new Date();
    })
  }

  onChosenMonth(month:number, event:MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      this.statisticService.getOrderLocationStatisticByChosenMonth(month).subscribe(data=>{
        this.orderLocations = data;
        this.totalCount = this.orderLocations.map(item=> item.count).reduce((prev, next)=> prev+next, 0);
        this.date = new Date();
        this.date.setMonth(this.date.getMonth() - month);
      });
    }else {
      this.getCurrentMonth();
    }
  }

  onLastMonth(event: MatButtonToggleChange){
    const checked = event.source.checked
    if(checked){
      this.statisticService.getOrderLocationStatisticByLastMonth().subscribe(data=>{
        this.orderLocations = data;
        this.totalCount = this.orderLocations.map(item=> item.count).reduce((prev, next)=> prev+next, 0);
        this.date = new Date();
        this.date.setDate(0);
        this.date.setMonth((this.date.getMonth()+1) - 1);
      });
    }else {
      this.getCurrentMonth();
    }
  }


  toggleChange(event: MatButtonToggleChange) {
    const toggle = event.source;
    if (toggle && event.value.some(item => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [toggle.value];
    }
  }

  protected readonly Date = Date;
}
