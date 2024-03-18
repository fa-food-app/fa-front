import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

//mantenimiento
const routes:Routes = [
  {path:'login',component:LoginComponent},
  {path:'registrar',component:RegisterComponent},
  {path:'cambiar-password',component:ForgetPasswordComponent} 
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
     ],
     exports:[
        RouterModule
     ]
   
})
export class  AuthRoutingModule { }
