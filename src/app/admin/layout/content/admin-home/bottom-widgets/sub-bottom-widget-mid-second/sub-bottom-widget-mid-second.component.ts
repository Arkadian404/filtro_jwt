import {Component, OnInit, Renderer2} from '@angular/core';
import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive } from 'ng-apexcharts';
import {FlavorStatistic} from "../../../../../../shared/models/statistic/flavor-statistic";
import {StatisticService} from "../../../../../../service/statistic.service";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

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

  onChosenMonth(month:number, event: MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      this.statisticService.getFlavorStatisticByChosenMonth(month).subscribe(data=>{
        this.flavorStatistic = data;
        this.initializePieChart();
        this.pieChartOptions.series = this.flavorStatistic.map(value => value.count);
        this.pieChartOptions.labels = this.flavorStatistic.map(value => value.name);
      });
    }else{
      this.getCurrentMonth();
    }
  }

  onLastMonth(event: MatButtonToggleChange){
   const checked = event.source.checked;
   if(checked){
     this.statisticService.getFlavorStatisticByLastMonth().subscribe(data=>{
       this.flavorStatistic = data;
       this.initializePieChart();
       this.pieChartOptions.series = this.flavorStatistic.map(value => value.count);
       this.pieChartOptions.labels = this.flavorStatistic.map(value => value.name);
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
