import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const roleGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if(tokenService.getRole()!== 'ADMIN'){
    router.navigate(['/admin/home']);
    return false;
  }
  return true;
};
