import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { JumbotromComponent } from '@app/shared/organisms/jumbotrom/jumbotrom.component';

import { AlimentoService } from '../../../core/services/alimento.service';
import { AlimentoDetail } from '@app/core/interfaces/alimeto-detail';
import { CommonModule } from '@angular/common';
import { TabNavComponent } from '@app/shared/organisms/tab-nav/tab-nav.component';
import { CalcularPropiedades } from '@app/core/interfaces/calcular-pripiedades.interface';
import { PropiedadesTermicas } from '@app/core/interfaces/propiedades-termica.interface';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [CommonModule,JumbotromComponent,TabNavComponent],
  templateUrl: './home-template.component.html',
  styleUrl: './home-template.component.scss'
})
export class HomeTemplateComponent implements OnInit{

  public alimento?:AlimentoDetail;
  private params: CalcularPropiedades = {
    proteina: 0,
    grasa: 0,
    carbohidrato: 0,
    fibra: 0,
    ceniza: 0,
    agua: 0,
    hielo: 0
  };
  propiedades?:PropiedadesTermicas
  public isValid:boolean=true;

  @ViewChild('InputTemp')
  inputTemp!:ElementRef<HTMLInputElement>;

  constructor(private alimentoService:AlimentoService){

  }
  ngOnInit(): void {
  }
  buscarDetalleAlimento(id:string){
    this.alimentoService.getAlimentoPorId(id).subscribe({
      next:(alimento)=>{ 
        this.alimento = alimento
        this.setProperties(this.alimento);
      }
    })
  }

  calcularPropiedades(){
    const temperatura = Number(this.inputTemp.nativeElement.value);
    if(temperatura>=0 && temperatura<=100){
      this.params.temperatura = temperatura;
      this.alimentoService.calcularPropiedades(this.params).subscribe({next:(response)=>{
        console.log(response);
        this.propiedades = response;
      }})
    }else{
        this.isValid=false;
    }
  }
  setProperties(alimento:AlimentoDetail){
    this.params.agua = alimento.humedad;
    this.params.hielo = 0;
    this.params.carbohidrato = alimento.carbohidratosTotal;
    this.params.fibra = alimento.fibraDietaria;
    this.params.ceniza = alimento.cenizas;
    this.params.grasa = alimento.lipidosG;
    this.params.proteina = alimento.proteinaG;
  }
}
