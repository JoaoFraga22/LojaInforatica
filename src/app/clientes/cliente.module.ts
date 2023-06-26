import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteFormPageComponent } from './components/cliente-form-page/cliente-form-page.component';
import { ClienteListPageComponent } from './components/cliente-list-page/cliente-list-page.component';
import { ClienteService } from './services/cliente.service';
import { ClienteFavoritosPageComponent } from './components/clientes-favoritos-page/clientes-favoritos-page.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, ClienteRoutingModule],
  declarations: [ClienteListPageComponent, ClienteFormPageComponent, ClienteFavoritosPageComponent],
  providers: [ClienteService],
})
export class ClienteModule {}