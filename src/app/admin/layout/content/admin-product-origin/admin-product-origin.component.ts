import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {ProductOriginService} from "../../../../service/product/product-origin.service";
import {ProductOrigin} from "../../../../shared/models/product/product-origin";
import {AdminProductOriginDialogComponent} from "./admin-product-origin-dialog/admin-product-origin-dialog.component";

@Component({
  selector: 'app-admin-product-origin',
  templateUrl: './admin-product-origin.component.html',
  styleUrls: ['./admin-product-origin.component.scss']
})
export class AdminProductOriginComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'continent', 'description', 'action'];
  dataSource!: MatTableDataSource<ProductOrigin>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productOriginService:ProductOriginService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit() {
    this.getOrigins();
  }
  getOrigins(){
    return this.productOriginService.getAdminProductOriginList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = (data, filter) =>{
            return data.name.toLowerCase().includes(filter)
          }
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  deleteProductOrigin(id:number){
    this.productOriginService.delete(id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng');
        this.getOrigins();
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


  private openDialog(dialog:ComponentType<any> ,data?:ProductOrigin) {
    const dialogRef = this.dialog.open(dialog, {data});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getOrigins();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(AdminProductOriginDialogComponent);
  }

  openUpdateDialog(data:ProductOrigin){
    this.openDialog(AdminProductOriginDialogComponent, data);
  }

  openDeleteDialog(data:ProductOrigin){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteProductOrigin(data.id);
      }
      console.log(data);
    });
  }
}
