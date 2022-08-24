import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { FormaPagamento } from './formaPagamento'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class FormasPagamentosService {

  apiURL: string = environment.apiURLBase + '/api/formas-pagamentos';

  constructor( private http: HttpClient ) {}

  salvar( formaPagamento: FormaPagamento ) : Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>( `${this.apiURL}` , formaPagamento);
  }

  atualizar( formaPagamento: FormaPagamento ) : Observable<any> {
    return this.http.put<FormaPagamento>(`${this.apiURL}/${formaPagamento.id}` , formaPagamento);
  }

  getFormasPagamentos() : Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.apiURL);
  }
  
  getFormaPagamentoById(id: number) : Observable<FormaPagamento> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(formaPagamento: FormaPagamento) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${formaPagamento.id}`);
  }

}
