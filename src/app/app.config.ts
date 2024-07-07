import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptorInterceptor } from './core/interceptors/TokenInterceptor.interceptor';
import {
  provideCharts,
  withDefaultRegisterables,
  } from 'ng2-charts';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptors([tokenInterceptorInterceptor]))
  ],

};
