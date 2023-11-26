import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortable} from "@angular/material/sort";
import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {Order} from "../../../../shared/models/order";
import {OrderService} from "../../../../service/order.service";
import {AdminOrderDialogComponent} from "./admin-order-dialog/admin-order-dialog.component";

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent {
  displayedColumns:string[] = [
    'id',
    'orderCode',
    'user',
    'fullName',
    'email',
    'phone',
    'address',
    'paymentMethod',
    'notes',
    'shippingMethod',
    'total',
    'orderDate',
    'status',
    'action'
  ]
  dataSource: MatTableDataSource<Order>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private orderService:OrderService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    return this.orderService.getAdminOrderList().subscribe(
      {
        next:data=>{
          this.dataSource = new MatTableDataSource(data);
          // this.sort.sort(<MatSortable>({id: 'orderDate', start: 'desc'}));
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = (data, filter)=>{
            return data.orderCode?.toLowerCase().includes(filter);
          }
        },
        error:err=>{
          console.log(err)
        }
      }
    )
  }

  deleteOrder(id:number){
    this.orderService.deleteAdminOrder(id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng');
        this.getOrders();
      },
      error:err=>{
        console.log(err)
      }
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  private openDialog(dialog:ComponentType<any>, data?:Order){
    const dialogRef = this.dialog.open(dialog, {data});
    dialogRef.afterClosed().subscribe({
      next:(data)=>{
        this.getOrders();
      }
    })
  }

  openUpdateDialog(data:Order){
    this.openDialog(AdminOrderDialogComponent, data);
  }

  openDeleteDialog(data:Order){
    this.dialogService.confirmDialog().subscribe(res=>{
      if(data.id !=null){
        this.deleteOrder(data.id);
      }
      console.log(data);
    })
  }
}
