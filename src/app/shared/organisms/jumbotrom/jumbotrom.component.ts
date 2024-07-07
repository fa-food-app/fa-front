import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Categoria } from '@app/core/interfaces/categoria.interface';
import { CategoriaService } from '@app/core/services/categoria.service';
import { SelectFormComponent } from '@app/shared/molecules/select-form/select-form.component';
import { AlimentoService } from '@app/core/services/alimento.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { Alimento } from '@app/core/interfaces/alimento.interface';

@Component({
  selector: 'app-jumbotrom',
  standalone: true,
  imports: [SelectFormComponent,ReactiveFormsModule],
  templateUrl: './jumbotrom.component.html',
  styleUrl: './jumbotrom.component.scss'
})
export class JumbotromComponent implements OnInit, OnDestroy {
  public categorias:Categoria[]=[];
  public alimentos:Alimento[]=[];
  private subscription: Subscription | null;
  @Output() alimentoSeleccionado:EventEmitter<string> ;

  public form:FormGroup = this.fb.group({
    categoriaId:['',Validators.required],
    alimentoId:['',Validators.required]
  })

  constructor(
    private fb:FormBuilder,
    private categoriaService:CategoriaService,
    private alimentoService:AlimentoService){
      this.alimentoSeleccionado = new EventEmitter();
      this.subscription = null;
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.onCategoriasChange();
  }

  obtenerCategorias(){
    this.categoriaService.getCategorias().subscribe({
      next:(categorias)=> this.categorias = categorias
    })
  }
  obtenerAlimentosPorCategoria(){
    this.categoriaService.getCategorias().subscribe({
      next:(categorias)=> this.categorias = categorias
    })
  }
   onCategoriasChange():void{
   this.subscription =  this.form.get('categoriaId')!.valueChanges
    .pipe(
      tap(()=> this.form.get('alimentoId')?.setValue('')),
      switchMap(cartegoriaId => this.alimentoService.getAlimentosPorCategoria(cartegoriaId))
    )
    .subscribe(alimentos=>{
      this.alimentos = alimentos;
    })
  }

  buscar(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.alimentoSeleccionado.emit(this.form.get('alimentoId')!.value);
  }

}
