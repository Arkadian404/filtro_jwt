import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, ApexTheme, ApexTitleSubtitle } from 'ng-apexcharts';
import {StatisticService} from "../../../../../../service/statistic.service";
import {CategoryStatistic} from "../../../../../../shared/models/statistic/category-statistic";


export type MonochromePieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-sub-bottom-widget-first',
  templateUrl: './sub-bottom-widget-first.component.html',
  styleUrls: ['../../admin-home.component.scss']
})
export class SubBottomWidgetFirstComponent implements OnInit{
  activeBtn = false;
  @ViewChild("allMonoPieBtn") allMonoPieBtn: ElementRef;
  @ViewChild("1MonoPieMonthBtn") chart1MonoPieMonthBtn: ElementRef;
  @ViewChild("6MonoPieMonthBtn") chart6MonoPieMonthBtn: ElementRef;
  @ViewChild("1MonoPieYearBtn") chart1MonoPieYearBtn: ElementRef;

  monochromePieChartOptions: Partial<MonochromePieChartOptions> | any;
  categoryStatistic:CategoryStatistic[] = [];

  constructor(private statisticService:StatisticService,
              private render: Renderer2) {
  }
  ngOnInit(): void {
    this.getCurrentMonth();
  }


  initializeMonochromePieChart(){
    this.monochromePieChartOptions = {
      chart: {
        height:350,
        width: "100%",
        type: "pie"
      },
      theme: {
        monochrome: {
          enabled: true
        }
      },
      legend: {
        show: true,
        fontSize: "12px",
        position:"bottom"
      },
      title: {
        // text: "Number of leads"
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
    this.statisticService.getCategoryStatisticByCurrentMonth().subscribe((data)=>{
      this.categoryStatistic = data;
      this.initializeMonochromePieChart();
      this.monochromePieChartOptions.series = this.categoryStatistic.map((item:CategoryStatistic)=>item.count);
      this.monochromePieChartOptions.labels = this.categoryStatistic.map((item:CategoryStatistic)=>item.name);
    })
  }

  onLastMonth(){
    this.activeBtn = !this.activeBtn;
    if(this.activeBtn){
      this.render.addClass(this.chart1MonoPieMonthBtn.nativeElement, "active-btn-secondary");
      this.statisticService.getCategoryStatisticByLastMonth().subscribe((data)=>{
        this.categoryStatistic = data;
        this.initializeMonochromePieChart();
        this.monochromePieChartOptions.series = this.categoryStatistic.map((item:CategoryStatistic)=>item.count);
        this.monochromePieChartOptions.labels = this.categoryStatistic.map((item:CategoryStatistic)=>item.name);
      });
    }else{
      this.render.removeClass(this.chart1MonoPieMonthBtn.nativeElement, "active-btn-secondary");
      this.getCurrentMonth();
    }
  }

}
