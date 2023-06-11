import { ClienteFormPageComponent } from './components/cliente-form-page/cliente-form-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ClienteListPageComponent } from './components/cliente-list-page/cliente-list-page.component';
import { ClienteFavoritosPageComponent } from './components/clientes-favoritos-page/clientes-favoritos-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full',
  },
  {
    path: 'lista',
    component: ClienteListPageComponent,
  },
  {
    path: 'cadastro',
    component: ClienteFormPageComponent,
  },
  {
    path: 'edicao/:id',
    component: ClienteFormPageComponent,
  },
  {
    path: 'favoritos',
    component: ClienteFavoritosPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRoutingModule {}