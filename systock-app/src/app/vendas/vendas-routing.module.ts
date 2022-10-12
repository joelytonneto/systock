import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendasFormComponent } from './vendas-form/vendas-form.component'; 
import { VendasListaComponent } from './vendas-lista/vendas-lista.component'; 
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path : 'vendas' , component: LayoutComponent, 
    canActivate: [AuthGuard] ,children: [
    
    { path: 'form' , component: VendasFormComponent },
    { path: 'form/:id' , component: VendasFormComponent },
    { path: 'lista', component: VendasListaComponent },
    { path: '', redirectTo : '/vendas/lista', pathMatch: 'full' }

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
