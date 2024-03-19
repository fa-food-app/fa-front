import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculosComponent } from './calculos/calculos.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetalleComponent } from './catalogo/detalle.component';

// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { ChartsModule } from 'ng2-charts';
import { GraficaComponent } from '../components/grafica/grafica.component';
import { ScatterComponent } from '../components/scatter/scatter.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CardPriceComponent } from '../shared/card-price/card-price.component';




// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts)
@NgModule({
  declarations: [
    PagesComponent,
    CalculosComponent,
    CatalogoComponent,
    DetalleComponent,
    GraficaComponent,
    ScatterComponent,
    LandingPageComponent,
    FooterComponent,
    NavbarComponent,
    CardPriceComponent
   
  ],
  exports: [
    CalculosComponent,
    CatalogoComponent,
    GraficaComponent,
    ScatterComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
  ]
})
export class PagesModule { }
