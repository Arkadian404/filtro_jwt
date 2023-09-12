import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../shared/models/category";
import {UserService} from "../../../service/user.service";
import {User} from "../../../shared/models/user";


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss', '../../reusable/dialog.scss']
})
export class UserDialogComponent implements OnInit{
  // @ts-ignore
  form:FormGroup<any>;
  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<UserDialogComponent>,
              private ref:ElementRef,
              private render:Renderer2,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group<User>({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      dob: new Date(),
      address: '',
      phone: '',
      enabled: false
    });
    if(this.data){
      const passwordField = this.ref.nativeElement.querySelector('#password');
      this.render.addClass(passwordField, 'hide-password')
      this.form.get('username')?.disable();
      this.form.get('email')?.disable();
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.userService.updateUser(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }else{
        this.userService.createUser(this.form.value).subscribe({
          next:() => {
            this.utilService.openSnackBar('Thêm thành công', 'Đóng');
            this.matDialog.close(true);
            console.log(this.form)
          },
          error:(err) => {
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }
    }
  }


}
