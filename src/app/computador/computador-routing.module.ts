import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ComputadorCadastroComponent } from "./components/cadastro/computador-cadastro.component";
import { ComputadorListPageComponent } from "./components/lista/computador-lista.component";

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
    },
    {
        path: 'lista',
        component: ComputadorListPageComponent
    },
    {
        path: 'cadastro',
        component: ComputadorCadastroComponent,
    },
    {
        path: 'edicao/:id',
        component: ComputadorCadastroComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComputadorRoutingModule { }