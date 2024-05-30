import {Component, NgZone, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../../../shared/models/auth/authentication-request.interface";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../service/token.service";
import {UtilService} from "../../../../service/util.service";
import {CartItemService} from "../../../../service/cart-item.service";
import {CartItemDto} from "../../../../shared/dto/cart-item-dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!:FormGroup;
  passwordType= false;
  cartItems: CartItemDto[];

  constructor(private formBuilder: FormBuilder,
              private authService:AuthenticationService,
              private tokenService:TokenService,
              private utilService:UtilService,
              private router: Router,
              private cartItemService: CartItemService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login(authRequest:AuthenticationRequest){
    let resp = this.authService.authenticate(authRequest);
    resp.subscribe({
      next: (data) => {
        console.log(data);
        this.tokenService.setAccessToken(data.accessToken);
        this.tokenService.setRefreshToken(data.refreshToken);
        this.utilService.openSnackBar('Đăng nhập thành công', 'Đóng')
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.utilService.openSnackBar(error, 'Đóng')
        console.log(error);
      }
    });
  }

  onSubmit():void{
    this.login(this.form.value);
  }


}
