import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Plan } from '@app/core/interfaces/plan.interface';

@Component({
  selector: 'app-plan-template',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './plan-template.component.html',
  styleUrl: './plan-template.component.scss'
})
export class PlanTemplateComponent {

    private router:Router = inject(Router);

    @Input()
    planes:Plan[] = [];
    agregarPlan(){
      this.router.navigateByUrl('/admin/planes/agregar')
    }

    editarPlan(id?:string){
      this.router.navigateByUrl(`/admin/planes/editar/${id}`)
    }
}
