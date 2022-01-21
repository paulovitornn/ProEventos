import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-Titulo',
  templateUrl: './Titulo.component.html',
  styleUrls: ['./Titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() iconClass: string = 'fa fa-user';
  @Input() subtitulo: string = 'Desde 2010';
  @Input() botaoListar: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
