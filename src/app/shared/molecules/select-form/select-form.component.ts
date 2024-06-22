import { Component, Input } from '@angular/core';
import {  FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select-form.component.html',
  styleUrl: './select-form.component.scss'
})
export class SelectFormComponent {

  @Input()
  label:string='';

  @Input()
  placeholder:string ='Escoja una opcion'

  @Input() control: FormControl = new FormControl('');
}
