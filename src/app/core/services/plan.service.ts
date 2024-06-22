import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Plan } from '../interfaces/plan.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private readonly url: string = environment.url || '';

  constructor(private http: HttpClient) {}

  registrarPlan(plan:Plan):Observable<Plan>{
    delete plan.id;
    return this.http.post<Plan>(`${this.url}/planes`,plan)
  }
  actualizarPlan(id:string,plan:Plan):Observable<Plan>{
    return this.http.patch<Plan>(`${this.url}/planes/${id}`,plan)
  }
  getPlanes():Observable<Plan[]>{
    return this.http.get<Plan[]>(`${this.url}/planes`);
  }

  getPlanesActivos():Observable<Plan[]>{
    return this.http.get<Plan[]>(`${this.url}/planes/activo`);
  }
  
  getPlanById(id:string):Observable<Plan>{
    return this.http.get<Plan>(`${this.url}/planes/${id}`);
  }

}
