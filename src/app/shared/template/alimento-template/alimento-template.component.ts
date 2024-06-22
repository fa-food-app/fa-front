import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlimentoDetail } from '@app/core/interfaces';
import { PaginationDto } from '@app/core/interfaces/pagination.interface';
import { AlimentoService } from '@app/core/services/alimento.service';
import { auditTime, debounceTime, distinctUntilChanged, fromEvent, map, Subject } from 'rxjs';

@Component({
  selector: 'app-alimento-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alimento-template.component.html',
  styleUrl: './alimento-template.component.scss'
})
export class AlimentoTemplateComponent implements OnInit{
  public alimentos :AlimentoDetail[] =[];
  private alimentoService: AlimentoService = inject(AlimentoService);
  private search$ = new Subject();

  private params:PaginationDto ={
    limit:10,
    offset:0
  }
  ngOnInit(): void {
    this.getAlimentos();
    this.buscarAlimento();
  }

  get listaAlimento(){
    return [...this.alimentos];
  }

  getAlimentos(){
    this.alimentoService.getAlimentos(this.params).subscribe({
      next:(alimentos)=> this.alimentos= alimentos
    })
  }

  search(value:any){
    this.search$.next(value)
  }

  buscarAlimento(){
    this.search$.pipe(
      auditTime(1000),
      map((event:any) =>  event),
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(
      (searchTerm: string) => {
        if (searchTerm.length > 2) {
          this.alimentoService.search(searchTerm).subscribe({
            next:(alimentos)=> this.alimentos= alimentos
          })
        } else {
            this.getAlimentos();
        }
    }
    )
  }
}
