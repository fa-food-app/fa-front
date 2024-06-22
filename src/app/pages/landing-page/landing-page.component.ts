import { Component } from '@angular/core';
import { LandingTemplateComponent } from '@app/shared/template/landing-template/landing-template.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LandingTemplateComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
