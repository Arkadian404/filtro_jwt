import {Component, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../../../../service/employee.service";
import {TokenService} from "../../../../../service/token.service";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './admin-employee-dialog.component.html',
  styleUrls: ['./admin-employee-dialog.component.scss' ,'../../reusable/dialog.scss']
})
export class AdminEmployeeDialogComponent implements OnInit{
  // @ts-ignore
  form:FormGroup<any>;
  // @ts-ignore
  isEmployee: boolean;
  roles = ['EMPLOYEE', 'ADMIN']
  constructor(private formBuilder:FormBuilder,
              private employeeService:EmployeeService,
              private tokenService:TokenService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminEmployeeDialogComponent>,
              private ref:ElementRef,
              private render:Renderer2,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group<any>({
      user: this.formBuilder.group({
        firstname:'',
        lastname:'',
        username:'',
        password:'',
        email:'',
        dob:'',
        address:'',
        phone:'',
        role:'',
        enabled:true,
      }),
      startOn:''
    });
    if(this.data){
      const passwordField = this.ref.nativeElement.querySelector('#password');
      this.render.addClass(passwordField, 'hide-password')
      this.form.get('user')!.get('username')!.disable();
      if(this.tokenService.getRole() === 'EMPLOYEE'){
        this.form.get('user')!.get('role')!.disable();
      }
      this.form.patchValue(this.data)
      console.log(this.data);
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.employeeService.updateEmployee(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            console.log(this.form.value)
            this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            console.log(this.form.value)
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }else{
        if(this.form.get('user')!.get('role')!.getRawValue() === 'ADMIN'){
          if(this.tokenService.getRole() === 'EMPLOYEE'){
            this.utilService.openSnackBar('Bạn không có quyền để thực hiện tác vụ này', 'Đóng');
            return;
          }
        }
          this.employeeService.createEmployee(this.form.value).subscribe({
            next:() => {
              console.log(this.form.value)
              this.utilService.openSnackBar('Thêm thành công', 'Đóng');
              this.matDialog.close(true);
              console.log(this.form)
            },
            error:(err) => {
              console.log(this.form.value)
              this.utilService.openSnackBar(err, 'Đóng');
            }
          })

      }
    }
  }

}
