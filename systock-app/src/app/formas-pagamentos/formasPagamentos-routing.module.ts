import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormasPagamentosFormComponent } from './formas-pagamentos-form/formas-pagamentos-form.component'; 
import { FormasPagamentosListaComponent } from './formas-pagamentos-lista/formas-pagamentos-lista.component'; 
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'

const routes: Routes = [
  { path : 'formas-pagamentos' , component: LayoutComponent, 
    canActivate: [AuthGuard] ,children: [
    
    { path: 'form' , component: FormasPagamentosFormComponent },
    { path: 'form/:id' , component: FormasPagamentosFormComponent },
    { path: 'lista', component: FormasPagamentosListaComponent },
    { path: '', redirectTo : '/formas-pagamentos/lista', pathMatch: 'full' }

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormasPagamentosRoutingModule { }
