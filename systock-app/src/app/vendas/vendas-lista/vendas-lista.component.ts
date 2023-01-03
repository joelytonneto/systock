import { Component, OnInit } from '@angular/core';
import { VendasBusca } from './vendasBusca';
import { VendasService } from '../vendas.service';
import { ptbr } from 'src/app/utils/calendar-prime-ng';

@Component({
  selector: 'app-vendas-lista',
  templateUrl: './vendas-lista.component.html',
  styleUrls: ['./vendas-lista.component.css']
})
export class VendasListaComponent implements OnInit {

  periodoInicialDataVenda: Date = new Date();
  periodoFinalDataVenda: Date = new Date();
  ptbr = ptbr;

  nome: string;
  mes: number;
  meses: number[];
  listaVendas: VendasBusca[];
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
      .getVendas(this.periodoInicialDataVenda, this.periodoFinalDataVenda)
      .subscribe(response => {
        this.listaVendas = response;
        if( this.listaVendas.length <= 0 ){
          this.message = "Nenhum Registro encontrado.";
        }else{
          this.message = null;
        }
      });
  }
}

