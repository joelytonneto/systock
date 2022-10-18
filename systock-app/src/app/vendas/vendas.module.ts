import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VendasRoutingModule } from './vendas-routing.module'; 
import { VendasFormComponent } from './vendas-form/vendas-form.component'; 
import { VendasListaComponent } from './vendas-lista/vendas-lista.component';

import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    VendasFormComponent,
    VendasListaComponent
  ],
  imports: [
    CommonModule,
    VendasRoutingModule,
    FormsModule,
    RouterModule,
    DropdownModule
  ], exports: [
    VendasFormComponent,
    VendasListaComponent
  ]
})
export class VendasModule { }