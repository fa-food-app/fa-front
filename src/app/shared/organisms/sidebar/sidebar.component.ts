import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Flowbite } from '@app/core/decorators/flowbite.decorator';
import { RouterItem } from '@app/core/interfaces';
import { LogotipoComponent } from '@app/shared/atoms/logotipo/logotipo.component';
import { SideMenuItemComponent } from '@app/shared/atoms/side-menu-item/side-menu-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LogotipoComponent,RouterModule,SideMenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
@Flowbite()
export class SidebarComponent {

  routes:RouterItem[] =[
    {
      name:'Dashboard',
      url:'/admin/inicio',
      icon:'fa-solid fa-gauge'
    },
    {
      name:'Propiedades termicas',
      url:'/propiedades-termicas',
      icon:'fa-solid fa-calculator'
    },
    {
      name:'Alimentos',
      url:'/admin/alimentos',
      icon:'fa-solid fa-apple-whole'
    },
    {
      name:'Categorias',
      url:'/admin/categorias',
      icon:'fa-solid fa-boxes-stacked'
    },
    {
      name:'Planes',
      url:'/admin/planes',
      icon:'fa-solid fa-book'
    },
    {
      name:'Suscripciones',
      url:'/admin/suscripciones',
      icon:'fa-solid fa-calendar-days'
    },

  ]
}
