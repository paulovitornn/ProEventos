import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef?: BsModalRef;
  message?: string;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  widthImg : number = 150;
  marginImg : number = 2;
  mostrarImagem : boolean = false;
  private _filtroLista : string = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService
    ) { }

    ngOnInit(): void {
    this.getEvents();
  }

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(filtro: string){
    this._filtroLista = filtro;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista): this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento:any) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  getEvents() :void {
    this.eventoService.getEvento().subscribe(
      (eventos: Evento[]) => {
        this.eventos = eventos

        this.eventosFiltrados = eventos
      },
      error => console.log(error)
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.modalRef?.hide();
  }

  decline(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.modalRef?.hide();
  }

}
