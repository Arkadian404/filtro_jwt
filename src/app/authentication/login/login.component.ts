import {Component, NgZone, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../shared/models/auth/authentication-request.interface";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!:FormGroup;
  errorMessage:string ="";

  constructor(private formBuilder: FormBuilder
              ,private jwtService:AuthenticationService,
              private tokenService:TokenService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group<AuthenticationRequest>({
      username: '',
      password: ''
    })
  }

  public login(authRequest:AuthenticationRequest){
    let resp = this.jwtService.authenticate(authRequest);
    resp.subscribe({
      next: (data) => {
        console.log(data);
        this.tokenService.setAccessToken(data.accessToken);
        this.tokenService.setRefreshToken(data.refreshToken);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error;
        console.log(error);
      }
    });
  }

  onSubmit():void{
    this.login(this.form.value);
  }
}
