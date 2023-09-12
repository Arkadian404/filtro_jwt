import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UtilService} from "../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {User} from "../../shared/models/user";
import {UserService} from "../../service/user.service";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  displayedColumns: string[] = ['id',
    'username',
    'firstname',
    'lastname',
    'email',
    'dob',
    'address',
    'phone',
    'role',
    'enabled',
    'action'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService:UserService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    return this.userService.getUserList()
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

  deleteEmployee(id:number){
    this.userService.deleteUser(id).subscribe({
      next:()=>{
        this.utilService.openSnackBar('Xóa thành công', 'Đóng');
        this.getUsers();
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


  private openDialog(dialog:ComponentType<any> ,data?:User) {
    const dialogRef = this.dialog.open(dialog, {data,
      height:'650px',
      width:'650px'});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getUsers();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(UserDialogComponent);
  }

  openUpdateDialog(data:User){
    this.openDialog(UserDialogComponent, data);
  }

  openDeleteDialog(data:User){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteEmployee(data.id);
      }
      console.log(data);
    });
  }

}
