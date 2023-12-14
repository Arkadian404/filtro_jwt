import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive } from 'ng-apexcharts';
import {FlavorStatistic} from "../../../../../../shared/models/statistic/flavor-statistic";
import {StatisticService} from "../../../../../../service/statistic.service";

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  labels: any;
}

@Component({
  selector: 'app-sub-bottom-widget-mid-second',
  templateUrl: './sub-bottom-widget-mid-second.component.html',
  styleUrls: ['../../admin-home.component.scss']
})
export class SubBottomWidgetMidSecondComponent implements OnInit{
  activeBtn = false;
  @ViewChild("allPieBtn") allPieBtn: ElementRef;
  @ViewChild("1PieMonthBtn") chart1PieMonthBtn: ElementRef;
  @ViewChild("6PieMonthBtn") chart6PieMonthBtn: ElementRef;
  @ViewChild("1PieYearBtn") chart1PieYearBtn: ElementRef;

  pieChartOptions: Partial<PieChartOptions> | any;

  flavorStatistic:FlavorStatistic[] = [];
  constructor(private statisticService:StatisticService,
              private render: Renderer2) {
  }
  ngOnInit(): void {
    this.getCurrentMonth();
  }

  initializePieChart(){
    this.pieChartOptions = {
      chart: {
        height: 350,
        type: "pie"
      },
      plotOptions: {
        pie:{
          offsetX:0,
          offsetY:0,
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
    this.statisticService.getFlavorStatisticByCurrentMonth().subscribe(data=>{
      this.flavorStatistic = data;
      this.initializePieChart();
      this.pieChartOptions.series = this.flavorStatistic.map(value => value.count);
      this.pieChartOptions.labels = this.flavorStatistic.map(value => value.name);
    })
  }

  onLastMonth(){
    this.activeBtn = !this.activeBtn;
    if(this.activeBtn){
      this.render.addClass(this.chart1PieMonthBtn.nativeElement,"active-btn-secondary");
      this.statisticService.getFlavorStatisticByLastMonth().subscribe(data=>{
        this.flavorStatistic = data;
        this.initializePieChart();
        this.pieChartOptions.series = this.flavorStatistic.map(value => value.count);
        this.pieChartOptions.labels = this.flavorStatistic.map(value => value.name);
      });
  }else{
      this.render.removeClass(this.chart1PieMonthBtn.nativeElement,"active-btn-secondary");
      this.getCurrentMonth();
    }
  }

}
