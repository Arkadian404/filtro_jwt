import {Component, OnInit, Renderer2} from '@angular/core';
import {ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive } from 'ng-apexcharts';
import {StatisticService} from "../../../../../../service/statistic.service";
import {BrandStatistic} from "../../../../../../shared/models/statistic/brand-statistic";
import {MatButtonToggleChange} from "@angular/material/button-toggle";



export type RadialBarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};


@Component({
  selector: 'app-sub-bottom-widget-mid-first',
  templateUrl: './sub-bottom-widget-mid-first.component.html',
  styleUrls: ['../../admin-home.component.scss']
})
export class SubBottomWidgetMidFirstComponent implements OnInit {
  radialBarChartOptions: Partial<RadialBarChartOptions> | any;

  brandStatistic:BrandStatistic[] = [];

  constructor(private statisticService:StatisticService,
              private render: Renderer2) {

  }
  ngOnInit(): void {
    this.getCurrentMonth();
  }

  initializeRadialBarChart(){
    this.radialBarChartOptions = {
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetX:0,
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
          },
          dataLabels: {
            show: true,
            name: {
              show: true
            },
            value: {
              show: true,
            },
            total:{
              show:true,
              label: "Tổng",
              formatter:function(w){
                return 100+"%";
              }
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      legend: {
        show: true,
        floating: true,
        fontSize: "14px",
        position: "left",
        labels: {
          useSeriesColors: true
        },
        // formatter: function(seriesName, opts) {
        //   return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        // },
        formatter: function(seriesName) {
          return seriesName;
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }

  getCurrentMonth(){
    this.statisticService.getBrandStatisticByCurrentMonth().subscribe((data)=>{
      this.brandStatistic = data;
      const total = this.brandStatistic.reduce((a,b)=>{return a+b.count},0);
      this.initializeRadialBarChart();
      this.radialBarChartOptions.series = this.brandStatistic.map((item:BrandStatistic)=>(item.count/total*100).toFixed(1));
      this.radialBarChartOptions.labels = this.brandStatistic.map((item:BrandStatistic)=>item.name);
    });
  }

  onChosenMonth(month:number, event:MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      this.statisticService.getBrandStatisticByChosenMonth(month).subscribe((data)=>{
        this.brandStatistic = data;
        const total = this.brandStatistic.reduce((a,b)=>{return a+b.count},0);
        this.initializeRadialBarChart();
        this.radialBarChartOptions.series = this.brandStatistic.map((item:BrandStatistic)=>(item.count/total*100).toFixed(1));
        this.radialBarChartOptions.labels = this.brandStatistic.map((item:BrandStatistic)=>item.name);
      });
    }else{
      this.getCurrentMonth();
    }
  }

  onLastMonth(event: MatButtonToggleChange){
    const checked = event.source.checked;
    if(checked){
      this.statisticService.getBrandStatisticByLastMonth().subscribe((data)=>{
        this.brandStatistic = data;
        const total = this.brandStatistic.reduce((a,b)=>{return a+b.count},0);
        this.initializeRadialBarChart();
        this.radialBarChartOptions.series = this.brandStatistic.map((item:BrandStatistic)=>(item.count/total*100).toFixed(1));
        this.radialBarChartOptions.labels = this.brandStatistic.map((item:BrandStatistic)=>item.name);
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
