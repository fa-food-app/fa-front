import { Component } from '@angular/core';
import { LoginTemplateComponent } from '@app/shared/template/login-template/login-template.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginTemplateComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
