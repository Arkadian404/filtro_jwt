import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../shared/models/category";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";
import {CategoryService} from "../../service/category.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UtilService} from "../../service/util.service";
import {ComponentType} from "@angular/cdk/overlay";
import {DialogService} from "../reusable/dialog.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'status', 'action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService:CategoryService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit() {
    this.getCategories();
  }
  getCategories(){
    return this.categoryService.getCategoryList()
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

  deleteCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getCategories();
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


  private openDialog(dialog:ComponentType<any> ,data?:Category) {
    const dialogRef = this.dialog.open(dialog, {data});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getCategories();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(CategoryDialogComponent);
  }

  openUpdateDialog(data:Category){
    this.openDialog(CategoryDialogComponent, data);
  }

  openDeleteDialog(data:Category){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteCategory(data.id);
      }
      console.log(data);
    });
  }

}
