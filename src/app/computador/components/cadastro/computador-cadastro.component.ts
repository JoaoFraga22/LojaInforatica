import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComputadorService } from '../../services/computador.service';
import { ComputadorInterface } from '../../types/computador.interface';

@Component({
  selector: 'app-computador-cadastro',
  templateUrl: './computador-cadastro.component.html',
})
export class ComputadorCadastroComponent implements OnInit {
  computadorForm: FormGroup = this.formBuilder.group({
    id: 0,
    nome: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(200)],
    ],
    marca: [
      '',
      [Validators.minLength(3), Validators.maxLength(150), Validators.required],
    ],
    preco: 0,
    publicacao: '2000-01-01',
  });

  edicao: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private computadorService: ComputadorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.edicao = !!id;

    if (id) {
      this.computadorService.getComputador(id).subscribe((computador) => {
        console.log(computador);
        this.computadorForm.patchValue(computador);
      }, (erro) => {
        console.log('Erro: ', erro);
      })
    }
  }

  onSubmit() {    
    const computador: ComputadorInterface = this.computadorForm.value;

    if (computador.id) {
      this.computadorService.update(computador).subscribe(() => this.redirect());
    } else {
      this.computadorService.save(computador).subscribe(() => this.redirect());
    }
  }

  redirect() {
    this.router.navigate(['computadores', 'lista']);
  }
}