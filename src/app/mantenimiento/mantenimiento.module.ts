import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RolesComponent } from './roles/roles.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AlimentoComponent } from './alimentos/alimento.component';
import { ModalImageComponent } from '../components/modal-image/modal-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioComponent } from './usuarios/usuario.component';
import { ModalEditAComponent } from '../components/modal-edit-a/modal-edit-a.component';
import { PerfilComponent } from '../shared/perfil/perfil.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { DetallesComponent } from './alimentos/detalles/detalles.component';




@NgModule({
  declarations: [
    MantenimientoComponent,
    SidebarComponent,
    DashboardComponent,
    UsuariosComponent,
    AlimentosComponent,
    CategoriasComponent,
    RolesComponent,
    AlimentoComponent,
    ModalImageComponent,
    PerfilComponent,
    BreadcrumbComponent,
    UsuarioComponent,
    ModalEditAComponent,
    DetallesComponent,
    
 ],
  exports: [
    DashboardComponent,
    UsuariosComponent,
    SidebarComponent,
    PerfilComponent,
    BreadcrumbComponent,
    AlimentosComponent,
    CategoriasComponent,
    RolesComponent,
    ModalImageComponent,
    ModalEditAComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class MantenimientoModule { }
