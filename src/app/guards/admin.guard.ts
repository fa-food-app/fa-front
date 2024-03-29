import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
 
 constructor(private usuarioService:UsuarioService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
  
   if(this.usuarioService.role == 1){
    return true;
   }else{
     this.router.navigateByUrl('/home/calculos')
     return false;
   }
  }
  
}
