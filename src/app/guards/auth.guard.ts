import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if(tokenService.isLoggedIn()) {
    if (tokenService.isUser()) {
      router.navigate(['/home']);
      return false;
    }
  }else{
    router.navigate(['/admin/login']);
    return false;
  }
  return true;
};
