import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../organisms/navbar/navbar.component';
import { JumbotromComponent } from '@app/shared/organisms/jumbotrom/jumbotrom.component';

import { AlimentoService } from '../../../core/services/alimento.service';
import { AlimentoDetail } from '@app/core/interfaces/alimeto-detail';
import { CommonModule } from '@angular/common';
import { TabNavComponent } from '@app/shared/organisms/tab-nav/tab-nav.component';
import { CalcularPropiedades } from '@app/core/interfaces/calcular-pripiedades.interface';
import { PropiedadesTermicas } from '@app/core/interfaces/propiedades-termica.interface';
import { combineLatest } from 'rxjs';
import { Azucar } from '@app/core/interfaces/azucar.interface';
import { Aminoacido } from '../../../core/interfaces/aminoacido.interface';
import { DocumentoService } from '../../../core/services/documento.service';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [CommonModule,JumbotromComponent,TabNavComponent],
  templateUrl: './home-template.component.html',
  styleUrl: './home-template.component.scss'
})
export class HomeTemplateComponent implements OnInit{

  public alimento?:AlimentoDetail;
  public azucar?:Azucar;
  public aminoacido?:Aminoacido;

  //SERVICE TO GENERATE PDF
  private documentoService:DocumentoService = inject(DocumentoService);

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

    combineLatest({
      alimento:this.alimentoService.getAlimentoPorId(id),
      aminoacido:this.alimentoService.getAminoacido(id),
      azucar:this.alimentoService.getAzucar(id),
    }).subscribe(resp=>{
      this.alimento = resp.alimento;
      if(resp.aminoacido){
        this.aminoacido = resp.aminoacido;

      }
      if(resp.aminoacido){
        this.azucar = resp.azucar;
      }
      this.setProperties(this.alimento);
    })
  }

  calcularPropiedades(){
    const temperatura = Number(this.inputTemp.nativeElement.value);
    if(temperatura>=0 && temperatura<=100){
      this.params.temperatura = temperatura;
      this.alimentoService.calcularPropiedades(this.params).subscribe({next:(response)=>{
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

  generatePdf(alimento:AlimentoDetail,azucar?:Azucar,aminoacido?:Aminoacido){
    const temperatura = Number(this.inputTemp.nativeElement.value);
    this.documentoService.generarPdf(alimento,temperatura,aminoacido,azucar,this.propiedades)
  }
}
