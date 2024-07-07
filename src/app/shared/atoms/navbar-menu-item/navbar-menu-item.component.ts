import { Component, Input } from '@angular/core';
import { RouterItem } from '@app/core/interfaces/navbar-menu.interface';

@Component({
  selector: 'app-navbar-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './navbar-menu-item.component.html',
  styleUrl: './navbar-menu-item.component.scss'
})
export class NavbarMenuItemComponent {
  @Input()
  route!:RouterItem;
}
