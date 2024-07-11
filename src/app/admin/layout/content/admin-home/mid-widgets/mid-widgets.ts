import {Component, OnInit, Renderer2} from '@angular/core';
import {StatisticService} from "../../../../../service/statistic.service";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
} from "ng-apexcharts";
import {OrderStatistic} from "../../../../../shared/models/statistic/order-statistic";
import {Revenue} from "../../../../../shared/models/statistic/revenue";
import {forkJoin, map, Observable} from "rxjs";
import {MatButtonToggleChange} from "@angular/material/button-toggle";


export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-mid-widgets',
  templateUrl: './mid-widgets.html',
  styleUrls: ['../admin-home.component.scss']
})
export class MidWidgets implements OnInit{
  currentMonth = new Date().getMonth()+1;

  orders?:OrderStatistic;
  revenue:Revenue[] = [];
  failedOrders?:OrderStatistic;
  ratioOrders:number = 0;
  totalRevenue = 0;
  lineChartOptions: Partial<LineChartOptions> | any;

  constructor(private  statisticService:StatisticService,
              private render: Renderer2) {
  }

  ngOnInit(): void {
    this.getCurrentMonth();
  }

  initializeChart(){
    this.lineChartOptions = {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#4de2bb"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        title: {
          text: "Ngày"
        }
      },
      yaxis: {
        title: {
          text: "Tiền"
        },
        labels:{
          formatter: function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").concat(" đ");
          }
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  processData(revenue$:Observable<any>, order$:Observable<any>, failedOrder$:Observable<any>){
    forkJoin([revenue$, order$, failedOrder$]).subscribe(([revenue, order, failedOrder])=>{
      this.revenue = revenue;
      this.orders = order;
      this.failedOrders = failedOrder;
      this.ratioOrders = Number(((this.orders.count - this.failedOrders.count)/this.orders.count*100).toFixed(2));
      this.totalRevenue = this.revenue.map(r=>r.revenue??0).reduce((a,b)=>a+b,0);
      this.initializeChart();
      this.lineChartOptions.series = [{name:"Doanh thu", data: this.revenue.map(r=>r.revenue??0)}];
      this.lineChartOptions.xaxis.categories = this.revenue.map(r=>r.day+"/"+r.month);
    });
  }

  getCurrentMonth(){
    const revenue$ = this.statisticService.getRevenueByCurrentMonth();
    const order$ = this.statisticService.getOrderStatisticByCurrentMonth();
    const failedOrder$ = this.statisticService.getFailedOrderStatisticByCurrentMonth();
    this.currentMonth = new Date().getMonth()+1;
    this.processData(revenue$, order$, failedOrder$);
  }

  onChosenMonth(month:number, event:MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      const revenue$ = this.statisticService.getRevenueByChosenMonth(month);
      const order$ = this.statisticService.getOrderStatisticByChosenMonth(month);
      const failedOrder$ = this.statisticService.getFailedOrderStatisticByChosenMonth(month);
      this.processDateRange(revenue$, order$, failedOrder$);
    }else{
      this.getCurrentMonth();
    }
  }

  onLastMonth(event: MatButtonToggleChange){
      const checked = event.source.checked;
      if(checked){
        const revenue$ = this.statisticService.getRevenueByLastMonth();
        const order$ = this.statisticService.getOrderStatisticByLastMonth();
        const failedOrder$ = this.statisticService.getFailedOrderStatisticByLastMonth();
        this.currentMonth = new Date().getMonth();
        this.processData(revenue$, order$, failedOrder$);
      }else{
        this.getCurrentMonth();
      }
  }

  processDateRange(revenue$:Observable<Revenue[]>, order$:Observable<OrderStatistic[]>, failedOrder$:Observable<OrderStatistic[]>){
    let tempOrders:OrderStatistic[] = [];
    let tempFailedOrders:OrderStatistic[] = [];
    let tempOrdersCounts = 0;
    let tempFailedOrdersCounts = 0;
    forkJoin([revenue$, order$, failedOrder$]).subscribe(([revenue, order, failedOrder])=>{
      this.revenue = revenue;
      tempOrders = order;
      tempFailedOrders = failedOrder;
      tempOrdersCounts = Number(tempOrders.map(o=>o.count??0).reduce((a,b)=>a+b,0));
      tempFailedOrdersCounts = Number(tempFailedOrders.map(o=>o.count??0).reduce((a,b)=>a+b,0));
      this.ratioOrders = Number(((tempOrdersCounts - tempFailedOrdersCounts)/tempOrdersCounts*100).toFixed(2));
      this.totalRevenue = this.revenue.map(r=>r.revenue??0).reduce((a,b)=>a+b,0);
      this.initializeChart();
      this.lineChartOptions.series = [{name:"Doanh thu", data: this.revenue.map(r=>r.revenue??0)}];
      this.lineChartOptions.xaxis.categories = this.revenue.map(r=>r.day+"/"+r.month);
      this.orders = {count: tempOrdersCounts}
      this.failedOrders = {count: tempFailedOrdersCounts}
    });
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    const dateStart = dateRangeStart.value;
    const dateEnd = dateRangeEnd.value;
    const revenue$ = this.statisticService.getRevenueByDateRange(dateStart, dateEnd);
    const order$ = this.statisticService.getOrderStatisticByDateRange(dateStart, dateEnd);
    const failedOrder$ = this.statisticService.getFailedOrderStatisticByDateRange(dateStart, dateEnd);
    this.processDateRange(revenue$, order$, failedOrder$);
  }


  toggleChange(event: MatButtonToggleChange) {
    const toggle = event.source;
    if (toggle && event.value.some(item => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [toggle.value];
    }
  }
}
