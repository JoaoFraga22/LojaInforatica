import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComputadorFormPageComponent } from './components/cadastro/computador-form-page.component';
import { ComputadorListPageComponent } from './components/lista/computador-lista.component';
import { ComputadorRoutingModule } from './computador-routing.module';
import { ComputadorService } from './services/computador.service';


@NgModule({
    imports: [CommonModule, HttpClientModule, IonicModule, FormsModule, ReactiveFormsModule, ComputadorRoutingModule],
    declarations: [ComputadorListPageComponent, ComputadorFormPageComponent],
    providers: [ComputadorService]
})
export class ComputadorModule { }