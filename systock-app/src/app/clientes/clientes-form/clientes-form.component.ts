import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Cliente } from '../cliente'
import { ClientesService } from '../clientes.service'; 
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Validacoes } from '../../utils/Validacoes';
import * as moment from 'moment';
import cep from 'cep-promise';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  @ViewChild('inputDateMask') myInputElementRef: ElementRef;

  formulario: FormGroup;

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
      private service: ClientesService ,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private formBuilder: FormBuilder
      ) {
    this.cliente = new Cliente();
  }

  async ngOnInit() {
    this.formBuilderCreate();
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getClienteById(this.id)
            .subscribe( 
              response => { 
                this.cliente = response;
                this.setValues();
                return;
              } ,
              errorResponse => this.cliente = new Cliente()
            )
        }
    });    
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes/lista']);
  }

  onSubmit(){
    if(this.id){
      
      this.getValues();
      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
            this.success = true;
            setTimeout(() => {
              this.success = false;
              this.router.navigate(['/clientes/lista']);
            }, 3000);
            this.errors = null;
        }, errorResponse => {
          this.errors = errorResponse.error.errors
        })


    }else{

      this.getValues();
      this.service
        .salvar(this.cliente)
          .subscribe( response => {
            this.success = true;
            setTimeout(() => {
              this.success = false;
              this.router.navigate(['/clientes/lista']);
            }, 3000);
            this.errors = null;
            this.cliente = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })

    }

  }

  formBuilderCreate() {
    this.formulario = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      dataCadastro: [{ value: '', disabled: true }],
      nome: ['', [Validators.required]],
      cpf: ['', [Validacoes.Validacpf]],
      dataNascimento: [ null ],
      celular: ['', [Validators.required]],
      cep: [''],
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      ativo: [null]
    });
  }

  getValues(cep: any = {}) {
    this.cliente.id = this.formulario.get('id').value;
    this.cliente.dataCadastro = this.formulario.get('dataCadastro').value;
    this.cliente.nome = this.formulario.get('nome').value;
    this.cliente.cpf = this.formulario.get('cpf').value;
    this.cliente.dataNascimento = moment(this.formulario.get('dataNascimento').value).locale('pt-br').format('YYYY-MM-DD');
    this.cliente.celular = this.formulario.get('celular').value;
    this.cliente.cep = this.formulario.get('cep').value;
    this.cliente.endereco = this.formulario.get('endereco').value;
    this.cliente.numero = this.formulario.get('numero').value;
    this.cliente.complemento = this.formulario.get('complemento').value;
    this.cliente.bairro = this.formulario.get('bairro').value;
    this.cliente.cidade = this.formulario.get('cidade').value;
    this.cliente.uf = this.formulario.get('uf').value;
    this.cliente.ativo = this.formulario.get('ativo').value;
  }

  setValues(cep: any = {}) {
    let dataNascimento = new Date(this.cliente.dataNascimento+"T00:00:00");
    this.formulario.controls['id'].setValue(this.cliente.id);
    this.formulario.controls['dataCadastro'].setValue(this.cliente.dataCadastro);
    this.formulario.controls['nome'].setValue(this.cliente.nome);
    this.formulario.controls['cpf'].setValue(this.cliente.cpf);
    this.formulario.controls['dataNascimento'].setValue(new Date(dataNascimento));
    this.formulario.controls['celular'].setValue(this.cliente.celular);
    this.formulario.controls['cep'].setValue(this.cliente.cep);
    this.formulario.controls['endereco'].setValue(this.cliente.endereco);
    this.formulario.controls['numero'].setValue(this.cliente.numero);
    this.formulario.controls['complemento'].setValue(this.cliente.complemento);
    this.formulario.controls['bairro'].setValue(this.cliente.bairro);
    this.formulario.controls['cidade'].setValue(this.cliente.cidade);
    this.formulario.controls['uf'].setValue(this.cliente.uf);
    this.formulario.controls['ativo'].setValue(this.cliente.ativo);
    
    if(this.formulario.get('dataNascimento').value) {
      document.getElementById("inputDateMasker").style.color = "currentColor";
    }
  }

  async cepSearch(cepInput) {
    try {
      if(cepInput.length >= 8) {
        let cepReturn = await cep(cepInput);
        this.formulario.controls['endereco'].setValue(cepReturn.street);
        this.formulario.controls['bairro'].setValue(cepReturn.neighborhood);
        this.formulario.controls['cidade'].setValue(cepReturn.city);
        this.formulario.controls['uf'].setValue(cepReturn.state);
        return (cepReturn);
      }
    } catch (error) {
      return;
    }
  }

  ngAfterViewInit(): void {
      Inputmask('datetime', {
      inputFormat: 'dd/mm/yyyy',
      alias: 'datetime',
      clearMaskOnLostFocus: false,
        isComplete: function(buffer, opts) {
            // console.log('Data', buffer, opts);
        }
      }).mask(this.myInputElementRef.nativeElement);
  }

  focusFunction() {  
    document.getElementById("inputDateMasker").style.color = "currentColor";
  }

  blurFunction() {
    let dataNascimento = this.formulario.get('dataNascimento').value;
    if(dataNascimento == null) {
      document.getElementById("inputDateMasker").style.color = "transparent";
    } else if(dataNascimento =! null) {
      document.getElementById("inputDateMasker").style.color = "currentColor";
    } else if(dataNascimento.length > 0) {
      document.getElementById("inputDateMasker").style.color = "currentColor";
    }
  }

}
