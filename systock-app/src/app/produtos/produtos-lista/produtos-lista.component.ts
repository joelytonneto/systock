import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Produto } from '../produto'; 
import { ProdutosService } from '../produtos.service'; 

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css']
})
export class ProdutosListaComponent implements OnInit {

  produtos: Produto[] = [];
  produtoSelecionado: Produto;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: ProdutosService, 
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getProdutos()
      .subscribe( resposta => this.produtos = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/produtos/form'])
  }

  preparaDelecao(produto: Produto){
    this.produtoSelecionado = produto;
  }

  deletarProduto(){
    this.service
      .deletar(this.produtoSelecionado)
      .subscribe( 
        response => {
          this.mensagemSucesso = 'Produto excluído com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao excluír o produto.'
      )
  }
}