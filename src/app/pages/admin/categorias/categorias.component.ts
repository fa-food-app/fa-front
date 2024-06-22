import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Categoria } from '@app/core/interfaces';
import { CommonModule } from '@angular/common';
import { CategoriaTemplateComponent } from '@app/shared/template/categoria-template/categoria-template.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule,CategoriaTemplateComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit {
 

  public categorias :Categoria[] =[];
  private categoriaService: CategoriaService = inject(CategoriaService);

  ngOnInit(): void {
    this.getCategorias();
  }


  getCategorias(){
    this.categoriaService.getCategorias().subscribe({
      next:(categorias)=> this.categorias= categorias
    })
  }

}
