import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {


  modalRef?: BsModalRef;
  message?: string;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  widthImg : number = 150;
  marginImg : number = 2;
  mostrarImagem : boolean = true;
  private _filtroLista : string = '';
  eventoId = 0;
  eventoTema = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.spinner.show();
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
    this.eventoService.getEvento().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = eventos
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar eventos.', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
  }

  openModal(template: TemplateRef<any>, eventoId: number, eventoTema: string) :void {
    this.eventoId = eventoId;
    this.eventoTema = eventoTema;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result:any) => {
        console.log(result);
        this.toastr.success(`Evento ${this.eventoTema} de código ${this.eventoId} foi excluído com sucesso!`);
        this.getEvents();
        this.spinner.hide();
      },
      (error:any) => {
        console.log(error);
        this.toastr.error(`Erro ao tentar excluir o evento ${this.eventoTema} de código ${this.eventoId}`, 'Erro')
        this.spinner.hide();
      },
      () => this.spinner.hide(),
    );

  }

  decline(): void {
    this.toastr.warning('Evento não foi excluído!');
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }


}
