import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ComputadorFormPageComponent } from "./components/cadastro/computador-form-page.component";
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
        component: ComputadorFormPageComponent,
    },
    {
        path: 'edicao/:id',
        component: ComputadorFormPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComputadorRoutingModule { }