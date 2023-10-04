import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {ProductDetail} from "../../../../shared/models/product/product-detail";
import {ProductDetailService} from "../../../../service/product-detail.service";
import {AdminProductDetailDialogComponent} from "./admin-product-detail-dialog/admin-product-detail-dialog.component";

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit{

  displayedColumns: string[] = ['id', 'product','weight','quantity','price', 'status', 'action'];
  dataSource!: MatTableDataSource<ProductDetail>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productDetailService:ProductDetailService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails(){
    return this.productDetailService.getProductDetails()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = (data, filter) => {
            return data.product.name.toLowerCase().includes(filter);
          }
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  deleteProductDetail(id:number){
    this.productDetailService.delete(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getProductDetails();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(event);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private openDialog(dialog:ComponentType<any> ,data?:ProductDetail){
    const dialogRef = this.dialog.open(dialog, {
      data,
      width: '650px',
      height: '725px'
    });
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getProductDetails();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(AdminProductDetailDialogComponent);
  }

  openUpdateDialog(data:ProductDetail){
    this.openDialog(AdminProductDetailDialogComponent, data);
  }

  openDeleteDialog(data:ProductDetail){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteProductDetail(data.id);
      }
      console.log(data);
    });
  }

}
