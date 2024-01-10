import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {Voucher} from "../../../../shared/models/voucher";
import {VoucherService} from "../../../../service/voucher.service";
import {AdminVoucherDialogComponent} from "./admin-voucher-dialog/admin-voucher-dialog.component";
import {CategoryService} from "../../../../service/product/category.service";
import {Category} from "../../../../shared/models/product/category";

@Component({
  selector: 'app-voucher',
  templateUrl: './admin-voucher.component.html',
  styleUrls: ['./admin-voucher.component.scss']
})
export class AdminVoucherComponent implements OnInit{
  displayedColumns:string[] = [
    'id',
    'name',
    'code',
    'discount',
    'description',
    'createdAt',
    'expirationDate',
    'action'
  ]
  dataSource: MatTableDataSource<Voucher>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private voucherService:VoucherService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit(): void {
    this.getVouchers();
  }

  getVouchers(){
    return this.voucherService.getAllVoucher().subscribe(
      {
        next:data=>{
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = (data, filter)=>{
            return data.name.toLowerCase().includes(filter);
          }
        },
        error:err=>{
          console.log(err)
        }
      }
    )
  }
  deleteVoucher(id:number){
    this.voucherService.deleteVoucher(id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng');
        this.getVouchers();
      },
      error:err=>{
        this.utilService.openSnackBar(err, 'Đóng');
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

  private openDialog(dialog:ComponentType<any>, data?:Voucher){
    const dialogRef = this.dialog.open(dialog, {data});
    dialogRef.afterClosed().subscribe({
      next:(data)=>{
        if(data){
          this.getVouchers();
        }
      }
    })
  }

  openCreateDialog(){
    this.openDialog(AdminVoucherDialogComponent);
  }

  openUpdateDialog(data:Voucher){
    this.openDialog(AdminVoucherDialogComponent, data);
  }

  openDeleteDialog(data:Voucher){
    this.dialogService.confirmDialog().subscribe(res=>{
      if(data.id !=null){
        this.deleteVoucher(data.id);
      }
      console.log(data);
    })
  }

}
