import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Plan } from '@app/core/interfaces/plan.interface';
import { ValidatorsService } from '@app/core/services/validators.service';

@Component({
  selector: 'app-add-plan-template',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-plan-template.component.html',
  styleUrl: './add-plan-template.component.scss',
})
export class AddPlanTemplateComponent {
  @Input()
  title: string = '';

  @Input()
  form!: FormGroup;

  @Output()
  formValue: EventEmitter<Plan> = new EventEmitter();

  private router:Router = inject(Router)

  private validatorsService: ValidatorsService = inject(ValidatorsService);
  public newCaracteristica: FormControl = new FormControl(
    '',
    Validators.required
  );
  get caracteristicas() {
    return this.form.get('caracteristicas') as FormArray;
  }
  onSubmit() {
    const tipoDePlan = this.form.get('tipoDePlan')?.value;
    if (tipoDePlan === 'Mensual') {
      this.form.get('duracion')?.setValue(30);
    } else {
      this.form.get('duracion')?.setValue(365);
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    (this.form.controls['caracteristicas'] as FormArray) = new FormArray<any>(
      []
    );
    this.formValue.emit(this.form.value);
  }

  onAddCaracteristica() {
    if (this.newCaracteristica.invalid) return;
    const newCaracteristica = this.newCaracteristica.value;
    this.caracteristicas.push(
      new FormControl(newCaracteristica, Validators.required)
    );
    this.newCaracteristica.reset();
  }
  isValidFieldInArray(formArray: FormArray, index: number) {
    return this.validatorsService.isValidFieldInArray(formArray, index);
  }
  onReturn(){
    this.router.navigateByUrl('/admin/planes')
  }
  onDeleteCaracteristica(index: number) {
    this.caracteristicas.removeAt(index);
  }
}
