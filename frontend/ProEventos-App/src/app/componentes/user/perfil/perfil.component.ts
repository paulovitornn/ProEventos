import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  loading = {
    save: false,
    page: false
  }

  get f():any {
    return this.form.controls;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ){ }

  ngOnInit() {
    //this.spinner.show();
    this.resetForm();
    this.validation();
    //this.spinner.hide();
  }

  setStatusLoaginda(x:number): void{
    //1 - status loading save
    //2 - status loading page
    if(x==1){
      this.loading.save = !this.loading.save;
    }
    else if (x==2){
      this.loading.page = !this.loading.page;
    }
  }

  private validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'validacaoSenha')
    }

    this.form = this.fb.group({

      titulo: ['',[Validators.required]],
      primeiroNome: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      ultimoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['',[Validators.required, Validators.email]],
      telefone: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      funcao: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      descricao: [],
      senha: ['',[Validators.minLength(6)]],
      validacaoSenha: ['', [Validators.minLength(6)]]
    }, formOptions);
  }

  public resetForm():void {
    this.form.reset();
  }

}
