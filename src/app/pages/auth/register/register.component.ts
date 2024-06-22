import { Component } from '@angular/core';
import { RegisterTemplateComponent } from '@app/shared/template/register-template/register-template.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterTemplateComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
