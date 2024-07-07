import { Injectable } from '@angular/core';

import { Azucar } from '../interfaces/azucar.interface';
import { Aminoacido } from '../interfaces/aminoacido.interface';
import { Columns, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { AlimentoDetail } from '../interfaces';
import { PropiedadesTermicas } from '../interfaces/propiedades-termica.interface';
import { Alimento } from '../interfaces/alimento.interface';
@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor() {}

  private title(title: string, value?: string | number) {
    return new Columns([new Txt(title).bold().end, new Txt(value!.toString()).bold().end]).margin(5). style('header').columnGap(100).end;
  }
  generarPdf(
    // categoria: string,
    alimento: AlimentoDetail,
    tempe?: number,
    aminoacido?: Aminoacido,
    azucar?: Azucar,
    propiedades?: PropiedadesTermicas,
  ) {
    const pdf = new PdfMakeWrapper();

    pdf.add(new Txt('Propiedades Termosificas').fontSize(20).bold().end);
 
    pdf.add(this.title('Nombre del alimento', alimento.nombre));
    // pdf.add(this.title('Categoria', categoria));
    pdf.add(new Txt('Analisis Proximal').bold().end);
    pdf.add(this.createTablaAnalisis1(alimento))
    pdf.add(pdf.ln());
    pdf.add(this.createTablaAnalisis2(alimento))
    pdf.add(pdf.ln(2));
    pdf.add(new Txt('Minerales').bold().end);
    // AGREGANDO MINERALES
    pdf.add(this.Minerales(alimento));
    pdf.add(pdf.ln(2));
    //  //AGREGANDO VITAMINAS
    pdf.add(new Txt('Vitaminas').bold().end);
    pdf.add(this.Vitaminas(alimento));
    pdf.add(pdf.ln(2));

    // //AGREGANDO ACIDOS
    pdf.add(new Txt('Acidos Grasos').bold().end);
    pdf.add(this.AcidosG(alimento));
    pdf.add(pdf.ln());
    //AGREGANDO AMINOACIDOS
    if(aminoacido){
      pdf.add(
        new Txt('Aminoacidos').bold().end
      )
      pdf.add(this.title('Acido aspartico (g)',aminoacido.acidoAspartico))
      pdf.add(this.title('Treonina (g)',aminoacido.treonina))
      pdf.add(this.title('Serina (g)',aminoacido.serina))
      pdf.add(this.title('Acido glutaminico (g)',aminoacido.acidoGlutaminico))
      pdf.add(this.title('Prolina (g)',aminoacido.prolina))
      pdf.add(this.title('glicina (g)',aminoacido.glicina))
      pdf.add(this.title('alanina (g)',aminoacido.alanina))
      pdf.add(this.title('cisteina (g)',aminoacido.cisteina))
      pdf.add(this.title('valina (g)',aminoacido.valina))
      pdf.add(this.title('metionina (g)',aminoacido.metionina))
      pdf.add(this.title('isoleucina (g)',aminoacido.isoleucina))
      pdf.add(this.title('leucina (g)',aminoacido.leucina))
      pdf.add(this.title('tirosina (g)',aminoacido.tirosina))
      pdf.add(this.title('fenilalanina (g)',aminoacido.fenilalanina))
      pdf.add(this.title('histidina (g)',aminoacido.histidina))
      pdf.add(this.title('lisina (g)',aminoacido.lisina))
      pdf.add(this.title('arginina (g)',aminoacido.arginina))
      pdf.add(this.title('triptofano (g)',aminoacido.triptofano))
    }
    if(azucar){
     //AGREGANDO AZUCAR
     pdf.add(pdf.ln())
     pdf.add(
       new Txt('Azucares').bold().end
     )
     pdf.add(this.title('Azucares disponibles (g)',azucar.azucaresDisponibles))
    //  pdf.add(this.title('Azucares no_reductores (g)',azucar.azucaresReductores))
     pdf.add(this.title('Azucares reductores (g)',azucar.azucaresReductores))
     pdf.add(this.title('Fructosa (g)',azucar.frutosa))
     pdf.add(this.title('Galactosa (g)',azucar.galactosa))
     pdf.add(this.title('Glucosa (g)',azucar.glucosa))
     pdf.add(this.title('Lactosa (g)',azucar.lactosa))
     pdf.add(this.title('Sacarosa (g)',azucar.sacarosa))

    }

    pdf.add(pdf.ln(2))
    pdf.add(
      new Txt('Propiedades Termicas').bold().end
    )
    pdf.add(this.temperatura(tempe));
    pdf.add(this.difusividad(propiedades?.difusivity.component));
    pdf.add(this.conductividad(propiedades?.conductivity.component));
    pdf.add(this.densidad(propiedades?.density.component));
    pdf.add(this.calorEspecifico(propiedades?.specifici.component));

    pdf.create().open();
  }

  // tabla de analisis proximal
  createTablaAnalisis1(alimento: AlimentoDetail) {
    return new Table([
      ['Humedad', 'Energia(kcal)', 'Energia(kj)', 'Lipidos(G)', 'Carbohidratos disponibles(g)'],
      [alimento.humedad,alimento.energiaKcal,alimento.energiakJ,alimento.lipidosG,alimento.carbohidratosDisp]
    ]
    ).widths('*')
    .layout({
      fillColor: function (i, node) {
        return i ===0 ? '#cccccc':'';
      }}).end
  }

  createTablaAnalisis2(alimento: AlimentoDetail) {
    return new Table([
      ['Proteina','Fibra dietaria(g)','Cenizas(g)','Carbohidrato totales(g)'],
      [alimento.proteinaG,alimento.fibraDietaria,alimento.cenizas,alimento.carbohidratosTotal]
    ]
    ).widths('*')
    .layout({
      fillColor: function (i, node) {
        return i ===0 ? '#cccccc':'';
      }}).end
  }
  // +++++++++++++++++++++++++++++++++++++

  //Tabla para visualizar los minerales
  Minerales(alimento: AlimentoDetail) {

    return new Table([
      ['Calcio (mg)','Hierro (mg)','Sodio (mg)','Fosforo (mg)','Yodo (mg)','Zinc (mg)','Magnecio (mg)','Potacio (mg)'],
      [alimento.calcio,alimento.hierro,alimento.sodio,alimento.fosforo,alimento.yodo,alimento.zinc,alimento.magnesio,alimento.potasio]
    ]
    ).widths('*')
    .layout({
      fillColor: function (i, node) {
        return i ===0 ? '#cccccc':'';
      }}).end
   }

  // +++++++++++++++++++++++++++++++++++++

  //Tabla para visualizar los Acidos G

  AcidosG(alimento: AlimentoDetail) {
    return new Table([
      ['Grasa (mg)','Grasa menos saturada (mg)','Polinsaturada (mg)','colesterol (g)','Parte comestible %'],
      [alimento.grasaSaturada,alimento.grasaMenosSaturada,alimento.grasaPoliinsaturada,alimento.colesterol,alimento.parteComestible]
    ]
    ).widths('*')
    .layout({
      fillColor: function (i, node) {
        return i ===0 ? '#cccccc':'';
      }}).end
  }

  // +++++++++++++++++++++++++++++++++++++

  //Tabla para visualizar las Vitaminas

  Vitaminas(alimento:AlimentoDetail) {
    return new Table([
      ['Tiamina (mg)','Riboflaxina (mg)','Niacina (mg)','Folatos (mg)','Vitamina A (er)', 'Vitamina C (mg)','vitamina B12 (mg)'],
      [alimento.tiamina,alimento.riboflaxina,alimento.niaxina,alimento.folatos,alimento.vitaminaA,alimento.vitaminaC,alimento.vitaminaB12]
    ]
    ).widths('*')
    .layout({
      fillColor: function (i, node) {
        return i ===0 ? '#cccccc':'';
      }}).end
  }

  // +++++++++++++++++++++++++++++++++++++

  //propiedades Termicas
  difusividad(valor?:number) {
   return new Columns([ 'Difusividad', `${valor} m²/s` ]).columnGap(10).end
  }
  densidad(valor?:number) {
    return new Columns([ 'Densidad', `${valor} kg/m³` ]).columnGap(10).end
  }
  conductividad(valor?:number) {
    return new Columns([ 'Conductividad', `${valor} W/(m*k)` ]).columnGap(10).end
  }
  calorEspecifico(valor?:number) {
    return new Columns([ 'Calor especifico', `${valor} J/(kg*K)` ]).columnGap(10).end
  }

  temperatura(valor?:number) {
    return new Columns([ 'Temperatura', `${valor} °C` ]).columnGap(10).end
  }
}
