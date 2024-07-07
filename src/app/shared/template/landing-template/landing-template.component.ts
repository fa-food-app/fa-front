import { Component } from '@angular/core';
import { CardPircingComponent } from '@app/shared/organisms/card-pircing/card-pircing.component';

@Component({
  selector: 'app-landing-template',
  standalone: true,
  imports: [CardPircingComponent],
  templateUrl: './landing-template.component.html',
  styleUrl: './landing-template.component.scss'
})
export class LandingTemplateComponent {

}
