import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './pages/layout/home-layout/home-layout.component';

export const routes: Routes = [
    {path: '', loadChildren: () => import('@pages/pages.routes').then( c => c.PAGE_ROUTES)}
];
