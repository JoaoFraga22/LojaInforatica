import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-cliente-form-page',
  templateUrl: './cliente-form-page.component.html',
})
export class ClienteFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  clienteForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private alertController: AlertController,
    private loadingService: LoadingService,
  ) {
  }

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter')
  }
  ionViewDidEnter(): void {
    console.log('ionViewDidEnter')
  }
  ionViewWillLeave(): void {
    console.log('ionViewWillLeave')
  }
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave')
  }
 
  ngOnInit(): void {
    this.loadingService
    this.initializeForm();
    this.loadClienteOnEditMode()
  }

  private loadClienteOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? id : '-1';

      if (this.id !== '-1') {
        this.loadingService.on()
        this.clienteService.getCliente(this.id).subscribe((cliente) => {
          this.clienteForm.patchValue({
            nome: cliente.nome,
            genero: cliente.genero,
            dataNascimento: cliente.dataNascimento,
            email: cliente.email,
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.clienteForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaNomeCliente(),
        ]
      ],
      genero: 'F',
      dataNascimento: '1970-01-01',
      email: '',
    })
  }

  validaNomeCliente(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'aquele') {
        return { invalidName: value }
      }
      if (value === 'xyz') {
        return { invalidName: value }
      }
      return null;
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  save(): void {
    if (this.createMode) {
      this.subscription.add(
        this.clienteService.save(this.clienteForm.value).subscribe(
          () => {
            this.router.navigate(['./clientes'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do cliente',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.clienteService.update({
        ...this.clienteForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./clientes'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do cliente',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./clientes'])
  }
}