import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComputadorService } from '../../services/computador.service';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { MarcaInterface } from 'src/app/marca/types/marca.interface';
import { MarcaService } from 'src/app/marca/services/marca.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-computador-form-page',
  templateUrl: './computador-form-page.component.html',
})
export class ComputadorFormPageComponent implements OnInit, OnDestroy,
  ViewWillEnter, ViewDidEnter,
  ViewWillLeave, ViewDidLeave {

  computadorForm!: FormGroup;
  subscription = new Subscription()
  createMode: boolean = false;
  editMode: boolean = false;
  id!: string;
  marcas: MarcaInterface[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private computadorService: ComputadorService,
    private alertController: AlertController,
    private marcaService: MarcaService,
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
    this.loadMarcas;
    this.loadComputadorOnEditMode()
  }

  private async loadMarcas() {
    this.loadingService.on();
    this.subscription.add(
      this.marcaService.getMarcas().subscribe((response) => {
        this.marcas = response;
        this.loadingService.off();
      })
    );
  }

  private loadComputadorOnEditMode() {
    const [url] = this.activatedRoute.snapshot.url;
    this.editMode = url.path === 'edicao';
    this.createMode = !this.editMode;

    if (this.editMode) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = id ? id : '-1';

      if (this.id !== '-1') {
        this.loadingService.on()
        this.computadorService.getComputador(this.id).subscribe((computador) => {
          this.computadorForm.patchValue({
            nome: computador.descricao,
            marca: computador.marca,
            valor: computador.valor,
            garantia: computador.garantia
          })
          this.loadingService.off()
        })
      }
    }
  }

  private initializeForm() {
    this.computadorForm = this.formBuilder.group({
      nome: [
        'Nome qualquer',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          this.validaDescricaoComputador(),
        ]
      ],
      marca: '',
    })
  }

  validaDescricaoComputador(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toLowerCase();
      if (value === 'teste') {
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
        this.computadorService.save(this.computadorForm.value).subscribe(
          () => {
            this.router.navigate(['./computadores'])
          },
          async () => {
            const alerta = await this.alertController.create({
              header: 'Erro',
              message: 'Não foi possível salvar os dados do computador',
              buttons: ['Ok']
            })
            alerta.present()
          }
        )
      )
    } else {
      this.computadorService.update({
        ...this.computadorForm.value,
        id: this.id
      }).subscribe({
        next: () => {
          this.router.navigate(['./computadores'])
        },
        error: async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do computador',
            buttons: ['Ok']
          })
          alerta.present()
        }
      })
    }
  }

  cancel(): void {
    this.router.navigate(['./computadores'])
  }

  compareWith(o1: MarcaInterface, o2: MarcaInterface) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}