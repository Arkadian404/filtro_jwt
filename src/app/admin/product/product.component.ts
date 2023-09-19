import {Component, OnInit, ViewChild} from '@angular/core';

import {ProductService} from "../../service/product.service";
import {ComponentType} from "@angular/cdk/overlay";
import {Product} from "../../shared/models/product";
import {UtilService} from "../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductDialogComponent} from "./product-dialog/product-dialog.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  displayedColumns: string[] = ['id',
    'name',
    'quantity',
    'sold',
    'price',
    'flavor',
    'description',
    'category',
    'sale',
    'createdAt',
    'updatedAt',
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
    return this.productService.getProductList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
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
    this.openDialog(ProductDialogComponent);
  }

  openUpdateDialog(data:Product){
    this.openDialog(ProductDialogComponent, data);
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
