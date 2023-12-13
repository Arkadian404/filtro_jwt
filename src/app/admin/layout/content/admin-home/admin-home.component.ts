import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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




export type AreaSplineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

export type RadialBarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  labels: any;
}

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  labels: any;
}

@Component({
  selector: 'app-main',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit{
  @ViewChild("lineChart") chart: ElementRef;

  public areaSplineChartOptions: Partial<AreaSplineChartOptions> | any;
  public radialBarChartOptions: Partial<RadialBarChartOptions> | any;
  public pieChartOptions: Partial<PieChartOptions> | any;
  public donutChartOptions: Partial<DonutChartOptions> | any;

  constructor() {

    this.areaSplineChartOptions = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.radialBarChartOptions = {
      series: [76, 67, 61, 90],
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
            image: undefined
          },
          dataLabels: {
            name: {
              show: true
            },
            value: {
              show: true
            },
            total:{
              show:true
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
      legend: {
        show: true,
        floating: true,
        fontSize: "14px",
        position: "left",
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
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
    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
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
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
    this.donutChartOptions = {
      series: [44, 55, 13, 43, 22],
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
                show:true
              }
            }
          }
        }
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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


  ngOnInit(): void {

    }


}
