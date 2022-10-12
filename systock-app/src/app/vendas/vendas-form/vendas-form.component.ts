import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { Entregador } from '../../entregadores/entregador';
import { EntregadoresService } from 'src/app/entregadores/entregadores.service';
import { Venda } from '../venda';
import { VendasService } from '../vendas.service'; 
import { Produto } from 'src/app/produtos/produto';

@Component({
  selector: 'app-vendas-form',
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.css']
})
export class VendasFormComponent implements OnInit {

  clientes: Cliente[] = [];
  entregadores: Entregador[] = [];

  venda: Venda;
  success: boolean = false;
  errors: String[];

  constructor(
    private clienteService: ClientesService,
    private entregadorService: EntregadoresService,
    private service: VendasService
  ) { 
    this.venda = new Venda();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe( responseClientes => this.clientes = responseClientes );

    this.entregadorService
      .getEntregadores()
      .subscribe( responseEntregadores => this.entregadores = responseEntregadores );
  }

  onSubmit(){

    let produto = new Produto();
    produto.id = 1;

    this.venda.itensVenda.push({                    
      id: null,
      venda: null,
      produto: produto,
      dataRegistro: null,
      valor: 10,
      quantidade: 2
    });

    this.service
      .salvar(this.venda)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.venda = new Venda();
        setTimeout(() => {
          this.success = null;          
        }, 2000);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }

}
