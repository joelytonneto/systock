import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { FormaPagamento } from '../formaPagamento';
import { FormasPagamentosService } from '../formasPagamentos.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formas-pagamentos-form',
  templateUrl: './formas-pagamentos-form.component.html',
  styleUrls: ['./formas-pagamentos-form.component.css']
})
export class FormasPagamentosFormComponent implements OnInit {

  formaPagamento: FormaPagamento;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
      private service: FormasPagamentosService,
      private router: Router,
      private activatedRoute : ActivatedRoute
      ) {
    this.formaPagamento = new FormaPagamento();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getFormaPagamentoById(this.id)
            .subscribe( 
              response => this.formaPagamento = response ,
              errorResponse => this.formaPagamento = new FormaPagamento()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/formas-pagamentos/lista'])
  }

  onSubmit(){
    if(this.id){

      this.service
        .atualizar(this.formaPagamento)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = errorResponse.error.errors
        })


    }else{

      this.service
        .salvar(this.formaPagamento)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.formaPagamento = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })

    }

  }

}