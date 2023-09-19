import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UtilService} from "../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {ProductImage} from "../../shared/models/product-image";
import {ProductImageService} from "../../service/product-image.service";
import {ProductImageDialogComponent} from "./product-image-dialog/product-image-dialog.component";

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit{

  displayedColumns: string[] = ['id',
    'imageName',
    'url',
    'createdAt',
    'updatedAt',
    'product',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<ProductImage>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productImageService:ProductImageService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService) {
  }
  ngOnInit(): void {
    this.getProductImageList();
  }

  getProductImageList(){
    return this.productImageService.getProductImageList()
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
    this.productImageService.deleteProductImage(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getProductImageList();
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


  private openDialog(dialog:ComponentType<any> ,data?:ProductImage) {
    const dialogRef = this.dialog.open(dialog, {data,
      width: '850px',
      height: '700px'});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getProductImageList();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(ProductImageDialogComponent);
  }

  openUpdateDialog(data:ProductImage){
    console.log(data);
    this.openDialog(ProductImageDialogComponent, data);
  }

  openDeleteDialog(data:ProductImage){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteProduct(data.id);
      }
      console.log(data);
    });
  }


}
