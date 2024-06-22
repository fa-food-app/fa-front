import { Component, OnInit } from '@angular/core';

import { AlimentoTemplateComponent } from '@app/shared/template/alimento-template/alimento-template.component';

@Component({
  selector: 'app-alimentos',
  standalone: true,
  imports: [AlimentoTemplateComponent],
  templateUrl: './alimentos.component.html',
  styleUrl: './alimentos.component.scss'
})
export class AlimentosComponent{
 
}
