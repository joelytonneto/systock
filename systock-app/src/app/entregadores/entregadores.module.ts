import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { EntregadoresRoutingModule } from './entregadores-routing.module';
import { EntregadoresFormComponent } from './entregadores-form/entregadores-form.component'; 
import { EntregadoresListaComponent } from './entregadores-lista/entregadores-lista.component';
import { EntregadoresService } from './entregadores.service';

@NgModule({
  declarations: [
    EntregadoresFormComponent,
    EntregadoresListaComponent
  ],
  imports: [
    CommonModule,
    EntregadoresRoutingModule,
    FormsModule
  ], exports: [
    EntregadoresFormComponent,
    EntregadoresListaComponent
  ], providers: [
    EntregadoresService
  ],
})
export class EntregadoresModule { }