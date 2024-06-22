import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Flowbite } from '@app/core/decorators/flowbite.decorator';
import { RouterItem } from '@app/core/interfaces/navbar-menu.interface';
import { LogotipoComponent } from '@app/shared/atoms/logotipo/logotipo.component';
import { NavbarMenuItemComponent } from '@app/shared/atoms/navbar-menu-item/navbar-menu-item.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavbarMenuItemComponent,CommonModule,LogotipoComponent,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
@Flowbite()
export class NavbarComponent {

  constructor(private readonly router:Router){

  }

  routes:RouterItem[] =[
    {
      name:'Inicio',
      url:'inicio'
    },
    {
      name:'Caracteristica',
      url:'caracteristica'
    },
    {
      name:'Precios',
      url:'precios'
    },
    {
      name:'Como funciona',
      url:'como-funciona'
    }
  ]


  navigateToLogin(){
    this.router.navigateByUrl('auth/login');
  }
}
