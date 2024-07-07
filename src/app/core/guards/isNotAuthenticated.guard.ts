import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enum/auth-status';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
 if(authService.authStatus() === AuthStatus.AUTHENTICATED){
   router.navigateByUrl('/admin/inicio')
  return false;
 }
 return true;
};
