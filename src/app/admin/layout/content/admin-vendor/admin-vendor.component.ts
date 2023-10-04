import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {Vendor} from "../../../../shared/models/product/vendor";
import {VendorService} from "../../../../service/vendor.service";
import {AdminVendorDialogComponent} from "./admin-vendor-dialog/admin-vendor-dialog.component";

@Component({
  selector: 'app-admin-vendor',
  templateUrl: './admin-vendor.component.html',
  styleUrls: ['./admin-vendor.component.scss']
})
export class AdminVendorComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'description', 'email', 'phone', 'address', 'action'];
  dataSource!: MatTableDataSource<Vendor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vendorService:VendorService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit() {
    this.getVendors();
  }
  getVendors(){
    return this.vendorService.getAdminVendorList()
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

  deleteVendor(id:number){
    this.vendorService.delete(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getVendors() ;
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


  private openDialog(dialog:ComponentType<any> ,data?:Vendor) {
    const dialogRef = this.dialog.open(dialog, {
      data,
      width: '650px',
      height: '650px'
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getVendors();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(AdminVendorDialogComponent);
  }

  openUpdateDialog(data:Vendor){
    this.openDialog(AdminVendorDialogComponent, data);
  }

  openDeleteDialog(data:Vendor){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteVendor(data.id);
      }
      console.log(data);
    });
  }
}
