import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFiltrados: any = [];
  widthImg : number = 150;
  marginImg : number = 2;
  mostrarImagem : boolean = false;
  private _filtroLista : string = '';

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


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEventosStatic(){
     this.eventos = [
      {
      tema:"teste",
      local:"testeLocal"
      },
      {
      tema:"teste2",
      local:"testeLocal2"
      }
    ];
  }

  getEvents() :void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response
        this.eventosFiltrados = response
      },
      error => console.log(error)
    )
  }

}
