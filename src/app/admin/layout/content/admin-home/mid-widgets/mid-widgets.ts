import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Chart} from "angular-highcharts";
import {StatisticService} from "../../../../../service/statistic.service";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend, ApexTooltip, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive
} from "ng-apexcharts";
import {OrderStatistic} from "../../../../../shared/models/statistic/order-statistic";
import {Revenue} from "../../../../../shared/models/statistic/revenue";
import {forkJoin, map, Observable} from "rxjs";


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
  activeBtn = false;
  @ViewChild("1Month") chart1Month: ElementRef;
  @ViewChild("6Month") chart6Month: ElementRef;
  @ViewChild("1Year") chart1Year: ElementRef;

  currentMonth = new Date().getMonth()+1;

  orders:OrderStatistic;
  revenue:Revenue[];
  failedOrders:OrderStatistic;
  public lineChartOptions: Partial<LineChartOptions> | any;

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
      // this.currentMonth = this.revenue.map(r=>r.month)[0] === undefined ?new Date().getMonth()+1 : this.revenue.map(r=>r.month)[0];
      this.initializeChart();
      this.lineChartOptions.series = [{name:"Doanh thu", data: this.revenue.map(r=>r.revenue??0)}];
      this.lineChartOptions.xaxis.categories = this.revenue.map(r=>r.day+"/"+r.month);
    });
  }

  getTotalRevenue(){
    return this.revenue?.map(r=>r.revenue??0).reduce((a,b)=>a+b,0);
  }

  ratioOrders(){
    return Number(((this.orders?.count - this.failedOrders?.count)/this.orders?.count*100).toFixed(2));
  }

  getCurrentMonth(){
    const revenue$ = this.statisticService.getRevenueByCurrentMonth();
    const order$ = this.statisticService.getOrderStatisticByCurrentMonth();
    const failedOrder$ = this.statisticService.getFailedOrderStatisticByCurrentMonth();
    this.processData(revenue$, order$, failedOrder$);
  }

  onLastMonth(){
    this.activeBtn = !this.activeBtn;
    if(this.activeBtn){
      this.render.addClass(this.chart1Month.nativeElement,"active-btn-secondary");
      const revenue$ = this.statisticService.getRevenueByLastMonth();
      const order$ = this.statisticService.getOrderStatisticByLastMonth();
      const failedOrder$ = this.statisticService.getFailedOrderStatisticByLastMonth();
      this.processData(revenue$, order$, failedOrder$);
    }else{
      this.render.removeClass(this.chart1Month.nativeElement,"active-btn-secondary");
      this.getCurrentMonth();
    }
  }




}
