import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Venda } from "./venda";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ItensVenda } from "./model/itensVenda";
import { Pagamento } from "./model/pagamento";

@Injectable({
    providedIn: 'root'
})
export class VendasService {

    apiURL: string = environment.apiURLBase + '/api/vendas';
    
    apiURLItensVenda: string = environment.apiURLBase + '/api/itens-venda';

    apiURLPagamentosVenda: string = environment.apiURLBase + '/api/pagamentos';

    constructor(private http: HttpClient ) {}

    salvar(venda: Venda) : Observable<Venda> {
        return this.http.post<Venda>(`${this.apiURL}`, venda);
    }

    atualizar(venda: Venda) : Observable<any> {
        return this.http.put<Venda>(`${this.apiURL}/${venda.id}`, venda);
    }

    
    getVendas(periodoInicial: Date, periodoFinal: Date) : Observable<Venda[]> {
        return this.http.get<Venda[]>(`${this.apiURL}?periodoInicial=${periodoInicial}&periodoFinal=${periodoFinal}`);
    }
    
    getVendaById(id: number) : Observable<Venda> {
        return this.http.get<any>(`${this.apiURL}/${id}`);
    }

    getPagamentosVenda(idVenda: Number) : Observable<Pagamento[]> {
        return this.http.get<Pagamento[]>(`${this.apiURLPagamentosVenda}?idVenda=${idVenda}`);
    }

    deletar(venda: Venda) : Observable<any> {
        return this.http.delete<any>(`${this.apiURL}/${venda.id}`);
    }

    getItensVendaByIdVenda(id: number) : Observable<ItensVenda[]> {
        return this.http.get<any>(`${this.apiURLItensVenda}/${id}`);
    }

}