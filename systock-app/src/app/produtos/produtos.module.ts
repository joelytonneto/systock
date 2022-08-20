import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { ProdutosRoutingModule } from './produtos-routing.module'; 
import { ProdutosFormComponent } from './produtos-form/produtos-form.component'; 
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component'; 

@NgModule({
  declarations: [
    ProdutosFormComponent,
    ProdutosListaComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    FormsModule
  ], exports: [
    ProdutosFormComponent,
    ProdutosListaComponent
  ]
})
export class ProdutosModule { }
