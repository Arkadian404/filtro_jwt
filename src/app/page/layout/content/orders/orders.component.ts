import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../../../service/order.service";
import {OrderDto} from "../../../../shared/dto/order-dto";
import {TokenService} from "../../../../service/token.service";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {UserDto} from "../../../../shared/dto/user-dto";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortable} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";

import {ComponentType, Overlay} from "@angular/cdk/overlay";
import {DialogService} from "../../../../admin/layout/content/reusable/dialog.service";
import {OrderDetailModalComponent} from "./order-detail-modal/order-detail-modal.component";
import {user} from "@angular/fire/auth";
import {Order} from "../../../../shared/models/order";
import {UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  isLoading = true;
  orders:OrderDto[] = [];
  user:UserDto;
  displayedColumns: string[] = ['orderCode', 'fullName', 'orderDate', 'total', 'status', 'action'];
  dataSource: MatTableDataSource<OrderDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private orderService:OrderService,
              private dialog:MatDialog,
              private dialogService:DialogService,
              private utilService: UtilService,
              private authenticationService:AuthenticationService){}
  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(){
    this.authenticationService.currentUserAccess().subscribe(user => {
      this.user = user;
      this.orderService.getAllOrderByUserId(this.user?.id).subscribe(orders=>{
        this.orders = orders;
        this.dataSource = new MatTableDataSource(orders);
        this.sort.sort(({id: 'orderDate', start: 'desc', disableClear: false}));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
        this.isLoading = false;
    })
  }

  private openDialog(component:ComponentType<any>, data?:OrderDto){
    const dialog = this.dialog.open(component, {data, autoFocus: false, height: '90vh', position:{top:'2%'}});
    dialog.afterClosed().subscribe({
      next:(data)=>{
        if(data){
          this.getUserOrders();
        }
      }
    })
  }

  openOrderDetailsDialog(data:OrderDto){
    this.openDialog(OrderDetailModalComponent, data);
  }


  cancelOrder(id:number){
    this.orderService.cancelOrder(id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng');
        this.getUserOrders();
      },
      error:err=>{
        console.log(err)
      }
    })
  }

  openCancelDialog(data:Order){
    this.dialogService.confirmDialog().subscribe(res=>{
      if(data.id !=null){
        this.cancelOrder(data.id);
      }
      console.log(data);
    })
  }

}
