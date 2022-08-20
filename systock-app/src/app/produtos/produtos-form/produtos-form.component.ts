import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Produto } from '../produto';
import { ProdutosService } from '../produtos.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  produto: Produto;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
      private service: ProdutosService,
      private router: Router,
      private activatedRoute : ActivatedRoute
      ) {
    this.produto = new Produto();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getProdutoById(this.id)
            .subscribe( 
              response => this.produto = response ,
              errorResponse => this.produto = new Produto()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/produtos/lista'])
  }

  onSubmit(){
    if(this.id){

      this.service
        .atualizar(this.produto)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = errorResponse.error.errors
        })


    }else{

      this.service
        .salvar(this.produto)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.produto = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })

    }

  }

}