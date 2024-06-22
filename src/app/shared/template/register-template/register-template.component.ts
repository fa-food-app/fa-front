import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterUser } from '@app/core/interfaces';
import { AuthService } from '@app/core/services/auth.service';
import { ValidatorsService } from '@app/core/services/validators.service';
import { EmailValidator } from '@app/core/validators/email-validators';
import { LogotipoComponent } from '@app/shared/atoms/logotipo/logotipo.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-template',
  standalone: true,
  imports: [LogotipoComponent, RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register-template.component.html',
  styleUrl: './register-template.component.scss',
})
export class RegisterTemplateComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private router:Router = inject(Router);
  private validatorsService: ValidatorsService = inject(ValidatorsService);
  private emailValidator: EmailValidator = inject(EmailValidator);
  private authService = inject(AuthService);
  public form: FormGroup = this.fb.group(
    {
      nombres: [
        '',
        [Validators.required,
        Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)],
      ],
      email: [
        '',
        [Validators.required,
        Validators.pattern(this.validatorsService.emailPattern)],
        this.emailValidator.validate.bind(this.emailValidator)
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', Validators.required],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'repassword'),
      ],
    }
  );

  send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newUser = {nombres:this.user.nombres,email:this.user.email,password:this.user.password}
    this.authService.register(newUser).subscribe({
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
          confirmButtonText: 'ok',
        });
      },
    });
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.form, field);
  }

  getFieldError(field:string):string | null{
    return this.validatorsService.getFieldError(this.form,field);
  
  }

  get user(){
    return this.form.value as RegisterUser;
  }

  existeEmail(){
    
    if(this.form.controls['email'].errors != null){
      return this.form.controls['email']?.errors['emailTaken'];
    }else{
      return false;
    }
  }
}
