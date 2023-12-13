import {Component, OnInit, ViewChild} from '@angular/core';

import {ProductService} from "../../../../service/product/product.service";
import {ComponentType} from "@angular/cdk/overlay";
import {Product} from "../../../../shared/models/product/product";
import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AdminProductDialogComponent} from "./admin-product-dialog/admin-product-dialog.component";

@Component({
  selector: 'app-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit{

  displayedColumns: string[] = ['id',
    'name',
    'brand',
    'sold',
    'flavor',
    'category',
    'sale',
    'createdAt',
    'updatedAt',
    'isSpecial',
    'isLimited',
    'origin',
    'vendor',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productService:ProductService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService) {
  }
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    return this.productService.getAdminProductList()
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

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng');
        this.getProductList();
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


  private openDialog(dialog:ComponentType<any> ,data?:Product) {
    const dialogRef = this.dialog.open(dialog, {data,
      width: '850px',
      height: '650px'});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getProductList();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(AdminProductDialogComponent);
  }

  openUpdateDialog(data:Product){
    this.openDialog(AdminProductDialogComponent, data);
  }

  openDeleteDialog(data:Product){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteProduct(data.id);
      }
      console.log(data);
    });
  }

}
