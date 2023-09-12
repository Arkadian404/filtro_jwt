import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {UtilService} from "../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {SaleService} from "../../service/sale.service";

import {ComponentType} from "@angular/cdk/overlay";

import {Sale} from "../../shared/models/sale";
import {SaleDialogComponent} from "./sale-dialog/sale-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-event',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name','description', 'start' , 'end', 'discount', 'status', 'action'];
  dataSource!: MatTableDataSource<Sale>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private eventService:SaleService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit(): void {
    this.getSales();
  }


  getSales(){
    return this.eventService.getSaleList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error:(err)=>{
          console.log(err);
          this.utilService.openSnackBar(err, 'Đóng')
        }
      });
  }

  deleteSale(id:number){
    this.eventService.deleteSale(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getSales();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private openDialog(dialog:ComponentType<any> ,data?:Sale) {
    const dialogRef = this.dialog.open(dialog, {data,
      width: '850px',
      height: '735px'
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getSales();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(SaleDialogComponent);
  }

  openUpdateDialog(data:Sale){
    this.openDialog(SaleDialogComponent, data);
  }

  openDeleteDialog(data:Sale){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteSale(data.id);
      }
      console.log(data);
    });
  }

}
