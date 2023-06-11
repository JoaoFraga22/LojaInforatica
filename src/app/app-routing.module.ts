import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'computadores',
    loadChildren: () => import('./computador/computador.module').then(m => m.ComputadorModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'marcas',
    loadChildren: () => import('./marca/marca.module').then(m => m.MarcaModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}