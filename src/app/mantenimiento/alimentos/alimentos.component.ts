import { Component, OnInit } from '@angular/core';
import { Alimento } from 'src/app/models/alimento.model';
import { AlimentoService } from '../../services/alimento.service';
import { ModalImageService } from '../../services/modal-image.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModalEditService } from '../../services/modal-edit.service';
import { delay } from 'rxjs/operators';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styles: [
  ]
})
export class AlimentosComponent implements OnInit {
  cargando: boolean = false;
  public alimentos: Alimento[] = [];
  public alimentosTemp: Alimento[] = [];
  public composiciones: any = [];
  public verAlimentosEliminados:boolean= false;
  public total: number;
  public desde: number = 0;
  constructor(
    private router: Router,
    private alimentoService: AlimentoService,
    private modalImageService: ModalImageService,
    private modalEditService:ModalEditService,
    private busquedaService:BusquedaService
  ) { }

  ngOnInit(): void {
    this.cargarAlimentos();
    this.modalImageService.nuevaImagen
    .pipe(
      delay(1000)
    ).subscribe(img=>{
       this.cargarAlimentos()
      })

  }
  detalles(alimento){
    this.router.navigateByUrl(`/admin/alimento/detalles/${alimento.codigo}`)

  }
  abrirModal(alimento: Alimento) {
    this.modalImageService.abrirModal('alimentos', alimento.codigo, alimento.imagen);
  }
eliminados(){
  this.cargando = false;
  this.verAlimentosEliminados=true;
  this.alimentoService.cargarAlimetosEliminados(this.desde).subscribe((resp: any) => {
    this.total = resp.count;
    this.alimentos = resp.alimentos;
    this.alimentosTemp = resp.alimentos;
    this.cargando = true;
  })
}
  cargarAlimentos() {
    this.verAlimentosEliminados=false;
    this.cargando = false;
    this.alimentoService.cargarAlimetos(this.desde).subscribe((resp: any) => {
      this.total = resp.count;
      this.alimentos = resp.alimentos;
      this.alimentosTemp = resp.alimentos;
      this.cargando = true;
    })
  }
  eliminarAlimento(alimento:Alimento) {
    Swal.fire({
      title: '¿Borrar Alimento?',
      text: `Esta a punto de borrar a ${alimento.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:'Si, borrarlo'
    }).then(result=>{
      if (result.value) {
        this.alimentoService.eliminarAlimento(alimento.codigo).subscribe(resp => {
          Swal.fire('Alimento borrado',`El alimento fue eliminado correctamente`,'success')
          this.cargarAlimentos();
        })
      
      }
    })
    
  } activarCategoria(alimento:Alimento) {
    this.alimentoService.activarAlimento(alimento.codigo,true)
      .subscribe((resp:any) => {
        this.cargarAlimentos();
        Swal.fire('activado', resp.msg, 'success');
        
      })
  }

  cargarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde > this.total) {
      this.desde -= valor;
    }
    this.cargarAlimentos();
  }

  editar(alimento: any) {
    if(alimento.aminoacidos.length !==0){
      this.modalEditService.abrirModal(alimento.codigo,true,false);
    }else  if(alimento.azucares.length !== 0){
      this.modalEditService.abrirModal(alimento.codigo,false,true);
    }else{
      this.modalEditService.abrirModal(alimento.codigo);
    }
  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.cargarAlimentos();
    }
    this.busquedaService.buscar('alimentos',termino).subscribe((resp:any)=>{
      this.alimentos = resp;
    })
    
  }

}
