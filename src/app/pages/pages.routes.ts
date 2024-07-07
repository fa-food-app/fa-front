import { Routes } from "@angular/router";
import { HomeLayoutComponent } from "./layout/home-layout/home-layout.component";
import { HomeComponent } from "./home/home.component";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardLayoutComponent } from "./layout/dashboard-layout/dashboard-layout.component";
import { isNotAuthenticatedGuard } from "@app/core/guards/isNotAuthenticated.guard";
import { isAuthenticatedGuard } from "@app/core/guards/isAuthenticated.guard";
import { CategoriasComponent } from "./admin/categorias/categorias.component";
import { AlimentosComponent } from "./admin/alimentos/alimentos.component";
import { PlanesComponent } from "./admin/planes/planes.component";
import { SuscripcionesComponent } from "./admin/suscripciones/suscripciones.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AddPlanComponent } from "./admin/planes/add-plan/add-plan.component";

export const PAGE_ROUTES: Routes = [
    {
        path:'auth',
        component:AuthLayoutComponent,
        canActivate:[isNotAuthenticatedGuard],
        children:[
            {path:'login',component:LoginComponent},
            {path:'register',component:RegisterComponent}
        ]
    },
    {
        path:'admin',
        component:DashboardLayoutComponent,
        canActivate:[isAuthenticatedGuard],
        children:[
            {path:'inicio',component:DashboardComponent},
            {path:'categorias',component:CategoriasComponent},
            {path:'alimentos',component:AlimentosComponent},
            {path:'planes',component:PlanesComponent},
            {path:'planes/agregar',component:AddPlanComponent},
            {path:'planes/editar/:id',component:AddPlanComponent},
            {path:'suscripciones',component:SuscripcionesComponent}
        ]
    },
    {
        path:'',
        component:HomeLayoutComponent,
        canActivate:[isAuthenticatedGuard],
        children:[
            {path:'', component:LandingPageComponent},
            {path:'propiedades-termicas', component:HomeComponent}
    ]
    }

];