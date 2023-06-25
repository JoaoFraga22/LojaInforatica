import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ComputadorService } from '../../services/computador.service';
import { ComputadorInterface } from '../../types/computador.interface';

@Component({
  selector: 'app-computador-lista',
  templateUrl: './computador-lista.component.html',
})

export class ComputadorListPageComponent implements ViewWillEnter, ViewDidLeave, OnDestroy {
  computadores: ComputadorInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private computadorService: ComputadorService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) { }

  ionViewDidLeave(): void {
    this.computadores = [];
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

    const subscription = this.computadorService.getComputadores()
      .subscribe(async (computadores) => {
        this.computadores = computadores;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de computadores carregada com sucesso!',
          duration: 15000,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de computadores',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }

  async remove(computadores: ComputadorInterface) {
    const alert = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o computador ${computadores.descricao}?`,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.subscriptions.add(
              this.computadorService.remove(computadores).subscribe(() => this.lista())
            );
          },
        },
        'Não',
      ],
    });
    alert.present();
  }
}