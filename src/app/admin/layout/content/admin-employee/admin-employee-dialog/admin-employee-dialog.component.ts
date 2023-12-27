import {Component, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../../../../service/user/employee.service";
import {TokenService} from "../../../../../service/token.service";

const NAME_PATTERN = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/;
const PHONE_PATTERN = /^\d{10,11}$|^0\d{9,10}$/
const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]/;

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './admin-employee-dialog.component.html',
  styleUrls: ['./admin-employee-dialog.component.scss' ,'../../reusable/dialog.scss']
})
export class AdminEmployeeDialogComponent implements OnInit{
  form:FormGroup<any>;
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
        firstname:['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
        lastname:['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
        username:['', Validators.required],
        password:['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
        email:['', [Validators.required, Validators.email]],
        dob:['', Validators.required],
        address:['', Validators.required],
        phone:['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
        role:['', Validators.required],
        enabled:[true, Validators.required],
      }),
      startOn:['', Validators.required]
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
        const convertDobDate = new Date(this.form.get('user').value.dob).toISOString();
        const convertStartOnDate = new Date(this.form.value.startOn).toISOString();
        this.form.get('user').value.dob = convertDobDate.slice(0,10);
        this.form.value.startOn = convertStartOnDate.slice(0,10);
        this.employeeService.updateEmployee(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            console.log(this.form.value)
            this.utilService.openSnackBar(data.message, 'Đóng')
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
        const convertDate = new Date(this.form.value.dob).toISOString();
        this.form.value.dob = convertDate.slice(0,10);
          this.employeeService.createEmployee(this.form.value).subscribe({
            next:(data) => {
              console.log(this.form.value)
              this.utilService.openSnackBar(data.message, 'Đóng');
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
