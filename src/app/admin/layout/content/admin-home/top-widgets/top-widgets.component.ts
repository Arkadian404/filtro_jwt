import {Component, OnInit} from '@angular/core';
import {faLocation} from '@fortawesome/free-solid-svg-icons';
import {StatisticService} from "../../../../../service/statistic.service";
import {Revenue} from "../../../../../shared/models/statistic/revenue";
import {forkJoin} from "rxjs";
import {OrderStatistic} from "../../../../../shared/models/statistic/order-statistic";
import {UserStatistic} from "../../../../../shared/models/statistic/user-statistic";
import {ProductStatistic} from "../../../../../shared/models/statistic/product-statistic";
@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['../admin-home.component.scss']
})
export class TopWidgetsComponent implements OnInit{
  currentMonthRevenue:Revenue;
  lastMonthRevenue:Revenue;
  revenueRatio:number;

  currentMonthOrder:OrderStatistic;
  lastMonthOrder:OrderStatistic;
  orderRatio:number;

  currentMonthUser:UserStatistic;
  lastMonthUser:UserStatistic;
  userRatio:number;

  currentMonthProduct:ProductStatistic;
  lastMonthProduct:ProductStatistic;
  productRatio:number;


  constructor(private statisticService:StatisticService) {
  }

  ngOnInit(): void {
    this.getRevenue();
    this.getOrderStatistic();
    this.getUserStatistic();
    this.getProductStatistic();
  }

  getRevenue(){
    const currentMonth = new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();
    const previousMonth = currentMonth-1;
    const currentRevenue$ = this.statisticService.getRevenue(currentMonth,currentYear);
    let previousRevenue$ = this.statisticService.getRevenue(previousMonth,currentYear);
    if(previousMonth==0){
      previousRevenue$ = this.statisticService.getRevenue(12,currentYear-1);
    }
    forkJoin([currentRevenue$, previousRevenue$]).subscribe(([current, previous])=>{
      this.currentMonthRevenue = current;
      this.lastMonthRevenue = previous;
      this.revenueRatio = Number(((this.currentMonthRevenue.revenue-this.lastMonthRevenue.revenue)/this.lastMonthRevenue.revenue*100).toFixed(2));
    })
  }

  getOrderStatistic(){
    const currentMonth = new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();
    const previousMonth = currentMonth-1;
    const currentOrderStatistic$ = this.statisticService.getOrderStatistic(currentMonth,currentYear);
    let previousOrderStatistic$ = this.statisticService.getOrderStatistic(previousMonth,currentYear);
    if(previousMonth==0){
      previousOrderStatistic$ = this.statisticService.getOrderStatistic(12,currentYear-1);
    }
    forkJoin([currentOrderStatistic$, previousOrderStatistic$]).subscribe(([current, previous])=>{
      this.currentMonthOrder = current;
      this.lastMonthOrder = previous;
      this.orderRatio = Number(((this.currentMonthOrder.count-this.lastMonthOrder.count)/this.lastMonthOrder.count*100).toFixed(2));
    })
  }

  getUserStatistic(){
    const currentMonth = new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();
    const previousMonth = currentMonth-1;
    const currentUserStatistic$ = this.statisticService.getUserStatistic(currentMonth,currentYear);
    let previousUserStatistic$ = this.statisticService.getUserStatistic(previousMonth,currentYear);
    if(previousMonth==0){
      previousUserStatistic$ = this.statisticService.getUserStatistic(12,currentYear-1);
    }
    forkJoin([currentUserStatistic$, previousUserStatistic$]).subscribe(([current, previous])=>{
      this.currentMonthUser = current;
      this.lastMonthUser = previous;
      this.userRatio = Number(((this.currentMonthUser.count-this.lastMonthUser.count)/this.lastMonthUser.count*100).toFixed(2));
    })
  }

  getProductStatistic(){
    const currentMonth = new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();
    const previousMonth = currentMonth-1;
    const currentProductStatistic$ = this.statisticService.getProductStatistic(currentMonth,currentYear);
    let previousProductStatistic$ = this.statisticService.getProductStatistic(previousMonth,currentYear);
    if(previousMonth==0){
      previousProductStatistic$ = this.statisticService.getProductStatistic(12,currentYear-1);
    }
    forkJoin([currentProductStatistic$, previousProductStatistic$]).subscribe(([current, previous])=>{
      this.currentMonthProduct = current;
      this.lastMonthProduct = previous;
      this.productRatio = Number(((this.currentMonthProduct.count-this.lastMonthProduct.count)/this.lastMonthProduct.count*100).toFixed(2));
    })
  }

  protected readonly isNaN = isNaN;
}
