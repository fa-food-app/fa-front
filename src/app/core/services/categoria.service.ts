import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly url: string = environment.url || '';
  
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/categorias`);
  }
}
