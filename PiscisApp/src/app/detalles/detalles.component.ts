import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  @Input() elemento: any = null;
  @Input() detallesElemento: any = false;
  @Output() cerrar = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onCerrar() {
    this.cerrar.emit();
  }

}
