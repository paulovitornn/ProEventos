import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  evento = {} as Evento;
  eventoId: number = 0;
  estadoSalvar:string = 'post';

  loading = {
    save: false,
    page: false
  }

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get f():any {
    return this.form.controls;
  }

  get bsConfig () : any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY, hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
     }
  }


  constructor(
    private eventoService: EventoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null){
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next:(evento: Evento) => {  //aqui também poderia utilizar apenas "() => {}""
          this.evento = {...evento}
          this.form.patchValue(this.evento);
        },
        error:(error:any) => {
          console.error(error);
        },
        complete:() => {
          this.spinner.hide();
        }
    })
    }
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
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

  public validation(): void {
    this.form = this.fb.group({
      tema: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['',[Validators.required, Validators.min(30), Validators.max(500)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.email]],
      imagemURL: ['', Validators.required]
    });
  }

  public validationFormGroup(): void {
    this.form = new FormGroup({
      tema: new FormControl('',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ),
      local: new FormControl('', Validators.required),
      dataEvento: new FormControl('', Validators.required),
      qtdPessoas: new FormControl('',
      [Validators.required, Validators.max(500)]
      ),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('',
      [Validators.required, Validators.email]
      ),
      imagemURL: new FormControl('', Validators.required)
    });
  }

  public resetForm():void {
    this.form.reset();
  }

  public cssValidator (campoForm: FormControl): any {
    return {'is-invalid': campoForm?.errors && campoForm?.touched};
  }

  public salvarAlteracao () : void {
    this.spinner.show();
    if(this.form.valid){

      this.evento =
        this.estadoSalvar=== 'post'
          ? {...this.form.value}
          : {id: this.evento.id, ...this.form.value};

      if(this.estadoSalvar=== 'post'){
        this.salvarNovoEvento()
      } else {
        this.salvarEdicaoEvento();
      }
    }
  }
  protected salvarNovoEvento (){
    this.eventoService.postEvento(this.evento).subscribe(
      () => this.toastr.success('Evento cadastrado com sucesso','Sucesso'),
      (error:any) => {
        console.log(error);
        this.toastr.error('Erro ao salvar evento','Erro');
      }
    ).add(() => this.spinner.hide());
  }

  protected salvarEdicaoEvento(){
    this.eventoService.putEvento(this.evento).subscribe(
      () => this.toastr.success('Evento editado com sucesso','Sucesso'),
      (error:any) => {
        console.log(error);
        this.toastr.error('Erro ao salvar alteração','Erro');
      }
    ).add(() => this.spinner.hide());
  }

}
