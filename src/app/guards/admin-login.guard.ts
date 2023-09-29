import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const adminLoginGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.isLoggedIn()) {
    router.navigate(['/admin/home']);
    return false;
  }
  return true;
}
