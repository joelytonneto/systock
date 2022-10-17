import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from 'src/app/clientes/clientes.service';
import { Entregador } from '../../entregadores/entregador';
import { EntregadoresService } from 'src/app/entregadores/entregadores.service';
import { Venda } from '../venda';
import { VendasService } from '../vendas.service'; 
import { Produto } from 'src/app/produtos/produto';
import { ProdutosService } from 'src/app/produtos/produtos.service';
import jQuery from 'jquery';

@Component({
  selector: 'app-vendas-form',
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.css']
})
export class VendasFormComponent implements OnInit {

  clientes: Cliente[] = [];
  entregadores: Entregador[] = [];
  produtos: Produto[] = [];

  venda: Venda;
  produto: Produto;

  quantidadeVenda: number = 1;
  valorTotalVenda: number = 0;

  success: boolean = false;
  errors: String[];

  constructor(
    private clienteService: ClientesService,
    private entregadorService: EntregadoresService,
    private produtoService: ProdutosService,
    private service: VendasService
  ) { 
    this.valorTotalVenda = 0;
    this.venda = new Venda();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientes()
      .subscribe( responseClientes => this.clientes = responseClientes );

    this.entregadorService
      .getEntregadores()
      .subscribe( responseEntregadores => this.entregadores = responseEntregadores );

    this.produtoService
      .getProdutos()
      .subscribe( responseProdutos => {
        this.produtos = responseProdutos;
        this.venda.produto = this.produtos[0];
      });

  }

  onSubmit(){       

    this.service
      .salvar(this.venda)
      .subscribe( response => {
        this.success = true;
        this.errors = null;
        this.venda = new Venda();
        this.valorTotalVenda = 0;
        setTimeout(() => {
          this.success = null;          
        }, 2000);
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
  }

  addProduto() {
    let produto = this.venda.produto;

    this.venda.itensVenda.push({                    
      id: null,
      venda: null,
      produto: produto,
      dataRegistro: null,
      valor: produto.precoVenda,
      quantidade: this.quantidadeVenda
    });

    jQuery('tbody').animate({
      scrollTop: jQuery("tbody")[0].scrollHeight
    }, 10);

    this.valorTotalVenda += (produto.precoVenda * this.quantidadeVenda);

    console.log(this.venda.itensVenda);
  }

}
