import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Chart} from "angular-highcharts";
import {StatisticService} from "../../../../../service/statistic.service";
import {OrderLocationStatistic} from "../../../../../shared/models/statistic/order-location-statistic";

@Component({
  selector: 'app-right-widgets',
  templateUrl: './right-widgets.html',
  styleUrls: ['../admin-home.component.scss']
})
export class RightWidgets implements OnInit{
  @ViewChild("1Month") chart1Month: ElementRef;
  @ViewChild("6Month") chart6Month: ElementRef;
  @ViewChild("1Year") chart1Year: ElementRef;

  activeBtn = false;
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

  onLastMonth(){
    this.activeBtn = !this.activeBtn;
    if(this.activeBtn){
      this.render.addClass(this.chart1Month.nativeElement, "active-btn-secondary");
      this.statisticService.getOrderLocationStatisticByLastMonth().subscribe(data=>{
        this.orderLocations = data;
        this.totalCount = this.orderLocations.map(item=> item.count).reduce((prev, next)=> prev+next, 0);
        this.date = new Date();
        this.date.setDate(0);
        this.date.setMonth((this.date.getMonth()+1) - 1);
      })
    }else{
      this.render.removeClass(this.chart1Month.nativeElement, "active-btn-secondary");
      this.getCurrentMonth();
    }

  }

  protected readonly Date = Date;
}
