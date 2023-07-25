import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'

import { Evento } from '../models/Evento';

@Injectable(/* {providedIn: 'root'} */) //Aqui é uma outra maneira de tornar o seviço injetavel, todavia é mais utilizado definir essa configuracao dentro do module

export class EventoService {
  baseURL = "https://localhost:5001/api/eventos";
  constructor(private http: HttpClient) { }

  public getEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL)
      .pipe(take(1));
  }

  public getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`)
      .pipe(take(1));
  }

  public getEventoById(idEvento:number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/idEvento/${idEvento}`)
      .pipe(take(1));
  }

  public postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.baseURL}/adicionarEvento`, evento)
      .pipe(take(1));
  }

  public putEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseURL}/atualizarEvento/${evento.id}`, evento)
      .pipe(take(1));
  }

  public deleteEvento(idEvento:number): Observable<any> {
    return this.http.delete(`${this.baseURL}/excluirEvento/${idEvento}`)
      .pipe(take(1));
  }

}
