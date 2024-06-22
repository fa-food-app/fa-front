import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Categoria } from '@app/core/interfaces';
import { PaginationDto } from '@app/core/interfaces/pagination.interface';
import { CategoriaService } from '@app/core/services/categoria.service';

@Component({
  selector: 'app-categoria-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-template.component.html',
  styleUrl: './categoria-template.component.scss'
})
export class CategoriaTemplateComponent implements OnInit {
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
