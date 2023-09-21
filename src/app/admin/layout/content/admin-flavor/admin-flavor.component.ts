import {Component, OnInit, ViewChild} from '@angular/core';
import {FlavorService} from "../../../../service/flavor.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Flavor} from "../../../../shared/models/flavor";
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {UtilService} from "../../../../service/util.service";
import {AdminFlavorDialogComponent} from "./admin-flavor-dialog/admin-flavor-dialog.component";

@Component({
  selector: 'app-flavor',
  templateUrl: './admin-flavor.component.html',
  styleUrls: ['./admin-flavor.component.scss']
})
export class AdminFlavorComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'description', 'status', 'action'];
  dataSource!: MatTableDataSource<Flavor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private flavorService:FlavorService,
              private dialogService:DialogService,
              private utilService:UtilService,
              private dialog:MatDialog) {
  }
  ngOnInit(): void {
    this.getFlavors();
  }

  getFlavors(){
    return this.flavorService.getFlavorList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.dataSource = new MatTableDataSource<Flavor>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
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

  private openDialog(dialog:ComponentType<any> ,data?:Flavor) {
    const dialogRef = this.dialog.open(dialog, {data});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getFlavors();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(AdminFlavorDialogComponent);
  }

  openUpdateDialog(data:Flavor){
    this.openDialog(AdminFlavorDialogComponent, data);
  }

  deleteFlavor(id:number){
    this.flavorService.deleteFlavor(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getFlavors();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  openDeleteDialog(data:Flavor){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteFlavor(data.id);
      }
      console.log(data);
    });
  }

}
