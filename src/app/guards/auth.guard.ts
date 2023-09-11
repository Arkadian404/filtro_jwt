import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (!tokenService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }else if(tokenService.getRole()!== 'ADMIN'){
    router.navigate(['/home']);
    return false;
  }else{
    return true;
  }
};
