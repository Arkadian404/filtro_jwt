import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Product} from "../../../../shared/models/product/product";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductService} from "../../../../service/product/product.service";
import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {AdminProductDialogComponent} from "../admin-product/admin-product-dialog/admin-product-dialog.component";
import {AdminTestDialogComponent} from "./admin-test-dialog/admin-test-dialog.component";

@Component({
  selector: 'app-admin-test',
  templateUrl: './admin-test.component.html',
  styleUrls: ['./admin-test.component.scss']
})
export class AdminTestComponent implements OnInit{

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
    this.openDialog(AdminTestDialogComponent);
  }

  openUpdateDialog(data:Product){
    this.openDialog(AdminTestDialogComponent, data);
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
