import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Entregador } from '../entregador'; 
import { EntregadoresService } from '../entregadores.service';

@Component({
  selector: 'app-entregadores-lista',
  templateUrl: './entregadores-lista.component.html',
  styleUrls: ['./entregadores-lista.component.css']
})
export class EntregadoresListaComponent implements OnInit {

  entregadores: Entregador[] = [];
  entregadorSelecionado: Entregador;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: EntregadoresService, 
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getEntregadores()
      .subscribe( resposta => this.entregadores = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/entregadores/form'])
  }

  preparaDelecao(entregador: Entregador){
    this.entregadorSelecionado = entregador;
  }

  deletarEntregador(){
    this.service
      .deletar(this.entregadorSelecionado)
      .subscribe( 
        response => {
          this.mensagemSucesso = 'Cadastro do entregador excluído com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao excluír o cadastro do entregador.'
      )
  }
}