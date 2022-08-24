import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Entregador } from './entregador'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class EntregadoresService {

  apiURL: string = environment.apiURLBase + '/api/entregadores';

  constructor( private http: HttpClient ) {}

  salvar( entregador: Entregador ) : Observable<Entregador> {
    return this.http.post<Entregador>( `${this.apiURL}` , entregador);
  }

  atualizar( entregador: Entregador ) : Observable<any> {
    return this.http.put<Entregador>(`${this.apiURL}/${entregador.id}` , entregador);
  }

  getEntregadores() : Observable<Entregador[]> {
    return this.http.get<Entregador[]>(this.apiURL);
  }
  
  getEntregadorById(id: number) : Observable<Entregador> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(entregador: Entregador) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${entregador.id}`);
  }

}
