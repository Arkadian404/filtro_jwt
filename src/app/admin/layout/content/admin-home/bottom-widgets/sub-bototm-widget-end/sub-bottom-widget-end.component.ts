import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive } from 'ng-apexcharts';
import {OriginStatistic} from "../../../../../../shared/models/statistic/origin-statistic";
import {StatisticService} from "../../../../../../service/statistic.service";


export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  labels: any;
}

@Component({
  selector: 'app-sub-bottom-widget-end',
  templateUrl: './sub-bottom-widget-end.component.html',
  styleUrls: ['../../admin-home.component.scss']
})
export class SubBottomWidgetEndComponent implements OnInit{
  activeBtn = false;
  @ViewChild("allDonutBtn") allDonutBtn: ElementRef;
  @ViewChild("1DonutMonthBtn") chart1DonutMonthBtn: ElementRef;
  @ViewChild("6DonutMonthBtn") chart6DonutMonthBtn: ElementRef;
  @ViewChild("1DonutYearBtn") chart1DonutYearBtn: ElementRef;

  donutChartOptions: Partial<DonutChartOptions> | any;

  originStatistic:OriginStatistic[] = [];

  constructor(private statisticService:StatisticService,
              private render: Renderer2) {
  }

  ngOnInit(): void {
    this.getCurrentMonth();
  }

  initializeDonutChart(){
    this.donutChartOptions = {
      chart: {
        height: 350,
        type: "donut"
      },
      plotOptions:{
        pie:{
          offsetX:0,
          offsetY:0,
          donut:{
            labels:{
              show:true,
              value:{
                show:true,
              },
              total:{
                show:true,
                label:"Tổng"
              }
            }
          }
        }
      },
      legend:{
        show:true,
        fontSize: "14px",
        position:"bottom"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  getCurrentMonth(){
    this.statisticService.getOriginStatisticByCurrentMonth().subscribe(data=>{
      this.originStatistic = data;
      this.initializeDonutChart();
      this.donutChartOptions.series = this.originStatistic.map(value => value.count);
      this.donutChartOptions.labels = this.originStatistic.map(value => value.name);
    });
  }

  onLastMonth(){
    this.activeBtn = !this.activeBtn;
    if(this.activeBtn){
      this.render.addClass(this.chart1DonutMonthBtn.nativeElement,"active-btn-secondary");
      this.statisticService.getOriginStatisticByLastMonth().subscribe(data=>{
        this.originStatistic = data;
        this.initializeDonutChart();
        this.donutChartOptions.series = this.originStatistic.map(value => value.count);
        this.donutChartOptions.labels = this.originStatistic.map(value => value.name);
      });
    }else{
      this.render.removeClass(this.chart1DonutMonthBtn.nativeElement,"active-btn-secondary");
      this.getCurrentMonth();
    }
  }

}
