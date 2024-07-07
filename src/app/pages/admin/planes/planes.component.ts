import { Component, inject, OnInit } from '@angular/core';
import { Plan } from '@app/core/interfaces/plan.interface';
import { PlanService } from '@app/core/services/plan.service';
import { PlanTemplateComponent } from '@app/shared/template/plan-template/plan-template.component';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [PlanTemplateComponent],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.scss'
})
export class PlanesComponent implements OnInit{
  private planService:PlanService = inject(PlanService)
  public planes:Plan[] =[];

  ngOnInit(): void {
   this.getPlanes();
  }

  getPlanes(){
    this.planService.getPlanes().subscribe({next:(planes)=>{
      this.planes  =planes;
    }})
  }
}
