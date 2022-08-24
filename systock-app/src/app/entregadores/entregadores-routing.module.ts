import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntregadoresFormComponent } from './entregadores-form/entregadores-form.component'; 
import { EntregadoresListaComponent } from './entregadores-lista/entregadores-lista.component'; 
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'

const routes: Routes = [
  { path : 'entregadores' , component: LayoutComponent, 
    canActivate: [AuthGuard] ,children: [
    
    { path: 'form' , component: EntregadoresFormComponent },
    { path: 'form/:id' , component: EntregadoresFormComponent },
    { path: 'lista', component: EntregadoresListaComponent },
    { path: '', redirectTo : '/entregadores/lista', pathMatch: 'full' }

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregadoresRoutingModule { }
