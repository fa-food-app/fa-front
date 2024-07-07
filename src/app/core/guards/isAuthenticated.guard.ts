import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../enum/auth-status';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
 if(authService.authStatus() === AuthStatus.AUTHENTICATED){
  return true;
 }
 if(authService.authStatus() === AuthStatus.CHECKING){
  return false;
 }

 router.navigateByUrl('/auth/login')
 return false;
};
