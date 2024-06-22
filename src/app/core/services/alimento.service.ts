import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AlimentoDetail, Alimento } from '../interfaces';
import { PaginationDto } from '../interfaces/pagination.interface';
import { CalcularPropiedades } from '../interfaces/calcular-pripiedades.interface';
import { PropiedadesTermicas } from '../interfaces/propiedades-termica.interface';

@Injectable({
  providedIn: 'root',
})
export class AlimentoService {
  private readonly url: string = environment.url || '';

  constructor(private http: HttpClient) {}

  getAlimentos(params: PaginationDto): Observable<AlimentoDetail[]> {
    const { limit, offset } = params;
    return this.http.get<AlimentoDetail[]>(
      `${this.url}/alimentos/?limit=${limit}&offset=${offset}`
    );
  }

  getAlimentosPorCategoria(id: string): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(`${this.url}/alimentos/categoria/${id}`);
  }

  getAlimentoPorId(id: string): Observable<AlimentoDetail> {
    return this.http.get<AlimentoDetail>(`${this.url}/alimentos/${id}`);
  }

  search(nombre: string): Observable<AlimentoDetail[]> {
    return this.http.get<AlimentoDetail[]>(
      `${this.url}/alimentos/search?nombre=${nombre}`
    );
  }

  calcularPropiedades(
    propiedades: CalcularPropiedades
  ): Observable<PropiedadesTermicas> {
    return this.http.post<PropiedadesTermicas>(
      `${this.url}/propiedades-termicas`,
      propiedades
    );
  }
}
