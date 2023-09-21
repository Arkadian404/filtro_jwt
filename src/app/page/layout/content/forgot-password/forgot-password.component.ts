import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../../../../service/email.service";
import {UtilService} from "../../../../service/util.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private emailService:EmailService,
              private utilService:UtilService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit(){
    if(this.form.valid){
      this.emailService.sendEmail(this.form.value.email).subscribe({
        next: (data) => {
          console.log(data);
          this.utilService.openSnackBar('Đã gửi email', 'Đóng')
        },
        error: (error) => {
          this.utilService.openSnackBar(error, 'Đóng')
          console.log(error);
        }
      })
    console.log(this.form.value.email);
    }
  }
}
