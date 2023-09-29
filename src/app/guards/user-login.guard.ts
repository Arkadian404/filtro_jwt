import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../service/token.service";
import {inject} from "@angular/core";

export const userLoginGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isLoggedIn()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
