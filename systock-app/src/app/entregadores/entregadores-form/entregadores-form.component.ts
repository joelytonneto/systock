import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Entregador } from '../entregador';
import { EntregadoresService } from '../entregadores.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entregadores-form',
  templateUrl: './entregadores-form.component.html',
  styleUrls: ['./entregadores-form.component.css']
})
export class EntregadoresFormComponent implements OnInit {

  entregador: Entregador;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
      private service: EntregadoresService,
      private router: Router,
      private activatedRoute : ActivatedRoute
      ) {
    this.entregador = new Entregador();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getEntregadorById(this.id)
            .subscribe( 
              response => this.entregador = response ,
              errorResponse => this.entregador = new Entregador()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/entregadores/lista'])
  }

  onSubmit(){
    if(this.id){

      this.service
        .atualizar(this.entregador)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = errorResponse.error.errors
        })


    }else{

      this.service
        .salvar(this.entregador)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.entregador = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })

    }

  }

}