import {Component, OnInit, Renderer2} from '@angular/core';
import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive } from 'ng-apexcharts';
import {OriginStatistic} from "../../../../../../shared/models/statistic/origin-statistic";
import {StatisticService} from "../../../../../../service/statistic.service";
import {MatButtonToggleChange} from "@angular/material/button-toggle";


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

  onChosenMonth(month: number, event: MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      this.statisticService.getOriginStatisticByChosenMonth(month).subscribe(data=>{
        this.originStatistic = data;
        this.initializeDonutChart();
        this.donutChartOptions.series = this.originStatistic.map(value => value.count);
        this.donutChartOptions.labels = this.originStatistic.map(value => value.name);
      });
    }else{
      this.getCurrentMonth();
    }
  }

  onLastMonth(event: MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      this.statisticService.getOriginStatisticByLastMonth().subscribe(data=>{
        this.originStatistic = data;
        this.initializeDonutChart();
        this.donutChartOptions.series = this.originStatistic.map(value => value.count);
        this.donutChartOptions.labels = this.originStatistic.map(value => value.name);
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
