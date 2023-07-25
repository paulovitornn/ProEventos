import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable(/* {providedIn: 'root'} */) //Aqui é uma outra maneira de tornar o seviço injetavel, todavia é mais utilizado definir essa configuracao dentro do module

export class EventoService {
  baseURL = "https://localhost:5001/api/eventos";
  constructor(private http: HttpClient) { }

  public getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  public getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`);
  }

  public getEventoById(idEvento:number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/idEvento/${idEvento}`);
  }

  public postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.baseURL}/adicionarEvento`, evento);
  }

  public putEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseURL}/atualizarEvento/${evento.id}`, evento);
  }

  public deleteEvento(idEvento:number): Observable<any> {
    return this.http.delete(`${this.baseURL}/excluirEvento/${idEvento}`);
  }

}
