import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { FormasPagamentosRoutingModule } from './formasPagamentos-routing.module'; 
import { FormasPagamentosFormComponent } from './formas-pagamentos-form/formas-pagamentos-form.component'; 
import { FormasPagamentosListaComponent } from './formas-pagamentos-lista/formas-pagamentos-lista.component'; 
import { FormasPagamentosService } from './formasPagamentos.service'; 

@NgModule({
  declarations: [
    FormasPagamentosFormComponent,
    FormasPagamentosListaComponent
  ],
  imports: [
    CommonModule,
    FormasPagamentosRoutingModule,
    FormsModule
  ], exports: [
    FormasPagamentosFormComponent,
    FormasPagamentosListaComponent
  ], providers: [
    FormasPagamentosService
  ],
})
export class FormasPagamentosModule { }