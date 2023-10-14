import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const userInfoGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (!tokenService.isLoggedIn()) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
