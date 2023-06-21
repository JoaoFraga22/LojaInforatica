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
    loadChildren: () => import('./clientes copy/cliente.module').then(m => m.computador1Module)
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