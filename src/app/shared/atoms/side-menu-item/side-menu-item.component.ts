import { Component, Input } from '@angular/core';
import { RouterItem } from '../../../core/interfaces/';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu-item.component.html',
  styleUrl: './side-menu-item.component.scss'
})
export class SideMenuItemComponent {
  @Input()
  route!:RouterItem
}
