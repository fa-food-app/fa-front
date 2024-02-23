import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';


//mantenimiento
import { DashboardComponent } from './dashboard/dashboard.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { RolesComponent } from './roles/roles.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AuthGuard } from '../guards/auth.guard';
import { AlimentoComponent } from './alimentos/alimento.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { NotfoundComponent } from '../pages/notfound/notfound.component';
import { PerfilComponent } from '../shared/perfil/perfil.component';
import { AdminGuard } from '../guards/admin.guard';
import { DetalleComponent } from '../pages/catalogo/detalle.component';



const routes:Routes = [
    {path:'admin',
        component: MantenimientoComponent,
        canActivate:[AuthGuard],
        children:[
        {path:'',component:DashboardComponent},
         {path:'dashboard', canActivate:[AdminGuard],component:DashboardComponent, data:{titulo:'Dashboard'}},
         {path:'alimentos', canActivate:[AdminGuard],component:AlimentosComponent, data:{titulo:'Alimentos'}},
         {path:'alimentos/:tipo/:id', canActivate:[AdminGuard],component:AlimentoComponent, data:{titulo:'Alimento'}},
         {path:'alimento/detalles/:id', canActivate:[AdminGuard],component:DetalleComponent, data:{titulo:'Detalles'}},
         {path:'roles', canActivate:[AdminGuard],component:RolesComponent, data:{titulo:'Roles'}},
         {path:'usuarios', canActivate:[AdminGuard],component:UsuariosComponent, data:{titulo:'Usuario'}},
         {path:'usuarios/nuevo', canActivate:[AdminGuard],component:UsuarioComponent, data:{titulo:'Nuevo usuario'}},
         {path:'categorias', canActivate:[AdminGuard],component:CategoriasComponent, data:{titulo:'Categoria'}},
         {path:'perfil', canActivate:[AdminGuard],component:PerfilComponent, data:{titulo:'Ajuste de cuenta'}},
         
         {path:'**', component:NotfoundComponent }
        ]
     }
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
     ],
     exports:[
        RouterModule
     ]
   
})
export class  MantenimientoRoutingModule { }
