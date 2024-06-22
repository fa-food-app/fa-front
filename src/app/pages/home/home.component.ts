import { Component } from '@angular/core';
import { HomeTemplateComponent } from '../../shared/template/home-template/home-template.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
