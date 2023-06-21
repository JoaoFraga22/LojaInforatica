import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteFormPageComponent } from './components/cliente-form-page/cliente-form-page.component';
import { ClienteListPageComponent } from './components/cliente-list-page/cliente-list-page.component';
import { ClienteService } from './services/cliente.service';


@NgModule({
  imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, ClienteRoutingModule],
  declarations: [ClienteListPageComponent, ClienteFormPageComponent],
  providers: [ClienteService],
})
export class computador1Module {}