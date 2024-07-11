import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive, ApexTheme, ApexTitleSubtitle } from 'ng-apexcharts';
import {StatisticService} from "../../../../../../service/statistic.service";
import {CategoryStatistic} from "../../../../../../shared/models/statistic/category-statistic";
import {MatButtonToggleChange} from "@angular/material/button-toggle";


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

  onChosenMonth(month:number, event:MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      this.statisticService.getCategoryStatisticByChosenMonth(month).subscribe((data)=>{
        this.categoryStatistic = data;
        this.initializeMonochromePieChart();
        this.monochromePieChartOptions.series = this.categoryStatistic.map((item:CategoryStatistic)=>item.count);
        this.monochromePieChartOptions.labels = this.categoryStatistic.map((item:CategoryStatistic)=>item.name);
      });
    }else{
      this.getCurrentMonth()
    }
  }

  onLastMonth(event:MatButtonToggleChange){
      const checked = event.source.checked;
      if(checked){
        this.statisticService.getCategoryStatisticByLastMonth().subscribe((data)=>{
          this.categoryStatistic = data;
          this.initializeMonochromePieChart();
          this.monochromePieChartOptions.series = this.categoryStatistic.map((item:CategoryStatistic)=>item.count);
          this.monochromePieChartOptions.labels = this.categoryStatistic.map((item:CategoryStatistic)=>item.name);
        });
      }else{
        this.getCurrentMonth();
      }
  }

  toggleChange(event: MatButtonToggleChange) {
    const toggle = event.source;
    if (toggle && event.value.some(item => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [toggle.value];
    }
  }
}
