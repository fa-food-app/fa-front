import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http"
import { map } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';
import { environment } from '../../environments/environment';


const base_url = environment.base_url

@Injectable({
   providedIn: 'root'
})
export class CategoriaService{
  constructor(private http: HttpClient) { }
  
    get token():string {
      return localStorage.getItem('token');
  }
  get headers(){
    return { headers: { 'x-token': this.token } };
    }
  
  
    cargarCategoria(desde?:number,limit?:number){
          return this.http.get(`${base_url}/api/categoria?desde=${desde}&limit=${limit}`,this.headers).pipe(
      map(( resp :{count:number,categorias:Categoria[]}) => {
        return resp;
      })
    );
    }

    crearCategoria(categoria: Categoria){
      const url=`${base_url}/api/categoria`;
        return this.http.post(url,categoria,this.headers);
    }
    


    actualizarCategoria(id:number,nombre: string) {
    
      return this.http.put(`${base_url}/api/categoria/${id}`, { nombre }, this.headers);
    
    }
  
    eliminarCategoria(id:number) {
      
      return this.http.delete(`${base_url}/api/categoria/${id}`, this.headers);
    
    }

    
    activarCategoria(id:number,estado: boolean) {
    
      return this.http.put(`${base_url}/api/categoria/activar/${id}`, { estado }, this.headers);
    
    }
  
}