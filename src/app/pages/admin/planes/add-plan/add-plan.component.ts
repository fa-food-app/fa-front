import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from '@app/core/interfaces/plan.interface';
import { PlanService } from '@app/core/services/plan.service';
import { AddPlanTemplateComponent } from '@app/shared/template/add-plan-template/add-plan-template.component';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [AddPlanTemplateComponent],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.scss'
})
export class AddPlanComponent  implements OnInit{
  
    private fb:FormBuilder = inject(FormBuilder);
    private router:Router = inject(Router);
    private planService:PlanService = inject(PlanService);
    public title="Agregar nuevo plan de suscripcion"
    public form:FormGroup = this.fb.group({
      id:[''],
      nombre:['',Validators.required],
      precio:['',Validators.required],
      tipoDePlan:['',Validators.required],
      duracion:['',Validators.required],
      activo:[false,Validators.required],
      caracteristicas:this.fb.array([])
    });
    private activatedRouter:ActivatedRoute = inject(ActivatedRoute)
    ngOnInit(): void {
          this.activatedRouter.params.pipe(
            switchMap(({id})=> this.planService.getPlanById(id))
          )
          .subscribe(plan=>{
            if(!plan) return this.router.navigateByUrl('/admin/planes');
            this.construirForm(plan);
            this.title= 'Editar plan de suscripcion'
            return;
          })
    }

    onsubmit(plan:Plan){
     const id = this.form.get('id')?.value;
      if(id){
        this.planService.actualizarPlan(id,plan).subscribe({
          next:(response)=>{
            if(response) {
              this.router.navigateByUrl('/admin/planes')
            }
          }
        })
      }else{
        this.planService.registrarPlan(plan).subscribe({
          next:(response)=>{
            if(response) {
              this.router.navigateByUrl('/admin/planes')
            }
          }
        })
      }
    }

    get caracteristicas(){
      return this.form.get('caracteristicas') as FormArray;
    }
    construirForm(plan:Plan){
    this.form.get('id')?.setValue(plan.id);
    this.form.get('nombre')?.setValue(plan.nombre);
    this.form.get('precio')?.setValue(plan.precio);
    this.form.get('tipoDePlan')?.setValue(plan.tipoDePlan);
    this.form.get('activo')?.setValue(plan.activo);
    this.caracteristicas.clear()
    plan.caracteristicas.forEach(caracteristica=>{
      this.caracteristicas.push(new FormControl(caracteristica,Validators.required))
    })
  }
}
