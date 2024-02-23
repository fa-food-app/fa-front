import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'alimentos' | 'usuarios',
    id:string|number
  ) {
    try {
      const url = `${base_url}/api/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token':localStorage.getItem('token') || ''
        },
        body:formData
      })
      const data = await resp.json();
      
        if(data.ok){
          return data.img;

        } else {
          console.log(data.msg);
          
          return false;
        }
      
    } catch (error) {
      
    }
  }
}
