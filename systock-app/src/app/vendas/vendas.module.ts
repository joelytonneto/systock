import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { VendasRoutingModule } from './vendas-routing.module'; 
import { VendasFormComponent } from './vendas-form/vendas-form.component'; 
import { VendasListaComponent } from './vendas-lista/vendas-lista.component';

import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

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
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule,
    MessagesModule,
    ButtonModule,
    DialogModule
  ], exports: [
    VendasFormComponent,
    VendasListaComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
})
export class VendasModule { }