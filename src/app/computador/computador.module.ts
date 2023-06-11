import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ComputadorCadastroComponent } from './components/cadastro/computador-cadastro.component';
import { ComputadorListPageComponent } from './components/lista/computador-lista.component';
import { ComputadorRoutingModule } from './computador-routing.module';
import { ComputadorService } from './services/computador.service';


@NgModule({
    imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, ComputadorRoutingModule],
    declarations: [ComputadorListPageComponent, ComputadorCadastroComponent],
    providers: [ComputadorService]
})
export class ComputadorModule { }