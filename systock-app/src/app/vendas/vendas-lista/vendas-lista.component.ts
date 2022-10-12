import { Component, OnInit } from '@angular/core';
import { VendasBusca } from './vendasBusca';
import { VendasService } from '../vendas.service';

@Component({
  selector: 'app-vendas-lista',
  templateUrl: './vendas-lista.component.html',
  styleUrls: ['./vendas-lista.component.css']
})
export class VendasListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  lista: VendasBusca[];
  message: string;

  constructor(
    private service: VendasService
  ) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit(): void {
  }

  consultar(){
    this.service
      .getVendas()
      .subscribe(response => {
        this.lista = response;
        if( this.lista.length <= 0 ){
          this.message = "Nenhum Registro encontrado.";
        }else{
          this.message = null;
        }
      });
  }
}

