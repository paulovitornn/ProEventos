import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  get f():any {
    return this.form.controls;
  }

  constructor(
    private eventoService: EventoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getEventById();
  }

  getEventById(){
    this.spinner.hide();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['',[Validators.required, Validators.min(30), Validators.max(500)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.email]],
      imagemUrl: ['', Validators.required]
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
      imagemUrl: new FormControl('', Validators.required)
    });
  }

}
