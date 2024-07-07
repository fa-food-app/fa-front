import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-list-item',
  standalone: true,
  imports: [],
  templateUrl: './nav-list-item.component.html',
  styleUrl: './nav-list-item.component.scss'
})
export class NavListItemComponent {

  @Input()
  title:string ='';
  @Input()
  value?:number = 0 ;
}
