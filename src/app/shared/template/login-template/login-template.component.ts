import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { ValidatorsService } from '@app/core/services/validators.service';
import { LogotipoComponent } from '@app/shared/atoms/logotipo/logotipo.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [LogotipoComponent, RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.scss',
})
export class LoginTemplateComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private router:Router = inject(Router);
  private validatorsService: ValidatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required,Validators.pattern(this.validatorsService.emailPattern)]],
    password: ['', Validators.required],
  });

  send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        if(response){
          this.router.navigateByUrl('/admin/inicio')
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: `${error}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.form, field);
  }

  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.form, field);
  }
}
