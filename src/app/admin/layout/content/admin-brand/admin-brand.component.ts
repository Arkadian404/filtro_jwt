import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Brand} from "../../../../shared/models/product/brand";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BrandService} from "../../../../service/brand.service";
import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {AdminBrandDialogComponent} from "./admin-brand-dialog/admin-brand-dialog.component";


@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.scss']
})
export class AdminBrandComponent implements OnInit{
  displayedColumns:string[] = [
    'id',
    'name',
    'description',
    'status',
  ]
  dataSource: MatTableDataSource<Brand>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  constructor(private brandService:BrandService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    return this.brandService.getBrandList().subscribe(
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

  deleteBrand(id:number){
    this.brandService.deleteBrand(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getBrands();
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

  private openDialog(dialog:ComponentType<any>, data?:Brand){
    const dialogRef = this.dialog.open(dialog, {data});
    dialogRef.afterClosed().subscribe({
      next:(data)=>{
        if(data){
          this.getBrands();
        }
      }
    })
  }

  openCreateDialog(){
    this.openDialog(AdminBrandDialogComponent);
  }

  openUpdateDialog(data:Brand){
    this.openDialog(AdminBrandDialogComponent, data);
  }

  openDeleteDialog(data:Brand){
    this.dialogService.confirmDialog().subscribe(res=>{
      if(data.id !=null){
        this.deleteBrand(data.id);
      }
      console.log(data);
    })
  }
}