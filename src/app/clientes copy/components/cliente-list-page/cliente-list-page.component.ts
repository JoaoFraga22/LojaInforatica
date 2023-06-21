import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { ClienteInterface } from '../../types/cliente.interface';

@Component({
  selector: 'app-cliente-list-page',
  templateUrl: './cliente-list-page.component.html',
})
export class ClienteListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  clientes: ClienteInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private clienteService: ClienteService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.clientes = [];
  }

  ionViewWillEnter(): void {
    this.lista();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async lista() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.clienteService.getClientes()
      .subscribe(async (clientes) => {
        this.clientes = clientes;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de clientes carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de clientes',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(cliente: ClienteInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o cliente ${cliente.nome}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.clienteService.remove(cliente).subscribe(() => this.lista())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }

  favorite(cliente: ClienteInterface) {
    const clientesFavoritesLocalStorage = window.localStorage.getItem('clientesFavoritos');
    let arrayClientesFavoritos = clientesFavoritesLocalStorage ? JSON.parse(clientesFavoritesLocalStorage) : [];

    const contain = arrayClientesFavoritos.some((a: ClienteInterface) => a.id === cliente.id);
    arrayClientesFavoritos = contain ? arrayClientesFavoritos : [...arrayClientesFavoritos, cliente]

    window.localStorage.setItem('clientesFavoritos', JSON.stringify(arrayClientesFavoritos))
  }
}
