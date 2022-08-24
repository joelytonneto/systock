import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { FormaPagamento } from '../formaPagamento'; 
import { FormasPagamentosService } from '../formasPagamentos.service';

@Component({
  selector: 'app-formas-pagamentos-lista',
  templateUrl: './formas-pagamentos-lista.component.html',
  styleUrls: ['./formas-pagamentos-lista.component.css']
})
export class FormasPagamentosListaComponent implements OnInit {

  formasPagamentos: FormaPagamento[] = [];
  formaPagamentoSelecionada: FormaPagamento;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: FormasPagamentosService, 
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getFormasPagamentos()
      .subscribe( resposta => this.formasPagamentos = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/formas-pagamentos/form'])
  }

  preparaDelecao(formaPagamento: FormaPagamento){
    this.formaPagamentoSelecionada = formaPagamento;
  }

  deletarFormaDePagamento(){
    this.service
      .deletar(this.formaPagamentoSelecionada)
      .subscribe( 
        response => {
          this.mensagemSucesso = 'Forma de Pagamento excluída com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao excluír a Forma de Pagamento.'
      )
  }
}