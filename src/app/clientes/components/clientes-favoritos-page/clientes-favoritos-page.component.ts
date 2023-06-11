import { Component, OnInit } from "@angular/core";
import { ClienteInterface } from "../../types/cliente.interface";

@Component({
  selector: 'app-clientes-favoritos-page',
  templateUrl: './clientes-favoritos-page.component.html',
})
export class ClienteFavoritosPageComponent implements OnInit {

  clientes: ClienteInterface[] = []

  ngOnInit(): void {
    const clientesFavoritesLocalStorage = window.localStorage.getItem('clientesFavoritos')
    this.clientes = clientesFavoritesLocalStorage ? JSON.parse(clientesFavoritesLocalStorage) : [];
  }

  unfavorite(cliente: ClienteInterface) {
    this.clientes = this.clientes.filter(a => a.id !== cliente.id);
    window.localStorage.setItem('clientesFavoritos', JSON.stringify(this.clientes));
  }
}