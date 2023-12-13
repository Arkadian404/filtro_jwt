import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {UtilService} from "../../../../service/util.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../reusable/dialog.service";
import {ComponentType} from "@angular/cdk/overlay";
import {EmployeeService} from "../../../../service/user/employee.service";
import {Employee} from "../../../../shared/models/employee";
import {AdminEmployeeDialogComponent} from "./admin-employee-dialog/admin-employee-dialog.component";

@Component({
  selector: 'app-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.scss']
})
export class AdminEmployeeComponent implements OnInit{
  displayedColumns: string[] = ['id',
    'username',
    'firstname',
    'lastname',
    'email',
    'dob',
    'address',
    'phone',
    'role',
    'startOn',
    'enabled',
    'action'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService:EmployeeService,
              private utilService:UtilService,
              private dialog: MatDialog,
              private dialogService:DialogService){
  }

  ngOnInit() {
    this.getEmployees();
  }
  getEmployees(){
    return this.employeeService.getEmployeeList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = (data, filter) =>{
            return data.user.username.toLowerCase().includes(filter)
          }
        },
        error:(err)=>{
          console.log(err)
          this.utilService.openSnackBar(err, 'Đóng');
        }
      });
  }

  deleteEmployee(id:number){
    this.employeeService.deleteEmployee(id).subscribe({
      next:(data)=>{
        this.utilService.openSnackBar(data.message, 'Đóng');
        this.getEmployees();
      },
      error:(err)=>{
        console.log(err);
        this.utilService.openSnackBar(err, 'Đóng');
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


  private openDialog(dialog:ComponentType<any> ,data?:Employee) {
    const dialogRef = this.dialog.open(dialog, {data,
      height:'750px',
      width:'600px'});
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.getEmployees();
        }
      }
    });
  }
  openCreateDialog(){
    this.openDialog(AdminEmployeeDialogComponent);
  }

  openUpdateDialog(data:Employee){
    this.openDialog(AdminEmployeeDialogComponent, data);
  }

  openDeleteDialog(data:Employee){
    this.dialogService.confirmDialog().subscribe(res=>{
      if (data.id != null) {
        this.deleteEmployee(data.id);
      }
      console.log(data);
    });
  }

}
