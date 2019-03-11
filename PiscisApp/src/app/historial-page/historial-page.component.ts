import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, NavigationEnd } from '@angular/router';
import * as M from 'materialize-css';
import * as $ from 'jquery';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgwWowService } from 'ngx-wow';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.scss']
})
export class HistorialPageComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  title = 'Temperaturas';
  @ViewChild('chart') el: ElementRef;
  contactos: any[];
  fecha = new Date();
  anos = ['Todos', `${this.fecha.getFullYear()}`];
  meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  dias = [];
  elemento = null;
  public numeroElemento = [];
  public numeroElementoFiltrado = [];
  detallesElemento = false;
  chart = false;
  temperatura = null;
  contactoEditar = null;
  contactoAgregar = false;
  arrayx = [];
  arrayy = [];

  constructor(
    private servicio: AuthService,
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private http: Http,
    private router: Router,
    private wowService: NgwWowService
  ) {
  }
  temperaturas: any;
  temperaturasFiltradas: any;

  // propiedades del filtrado
  ano: string;
  mes: string;
  dia: string;
  filtro = true;

  // reglas de filtros activos
  filtros = {};

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 24
    };
    M.AutoInit();
    // WOW.init();

    // tslint:disable-next-line:max-line-length
    // se extraen los datos por primera vez... En este caso se mostraran todos los datos la primera vez que se cargue la pagina antes de aplicar los filtros.
    this.db.list('/Piscis/Historial/Sensores').snapshotChanges()
      .map(temperaturas => {
        return temperaturas.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe(temperaturas => {
        this.temperaturas = temperaturas;
        this.dtTrigger.next();
      });

    // se llaman a las funciones desde el servicio y se igualan todas las letiables.
    this.servicio.extraerDatos();
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtros = this.servicio.filtros;
  }

  ngOnDestroy(): void {
    // control del paginado de la tabla
    this.dtTrigger.unsubscribe();
  }

  // se aplica el filtro para el select de años
  filtroExactoAno(property: string, regla: any) {
    this.numeroElementoFiltrado = [];
    this.servicio.filtroExactoAno(property, regla);
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
  }

  // se aplica el filtro para el select de mes
  filtroExactoMes(property: string, regla: any) {
    this.servicio.filtroExactoMes(property, regla);
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
  }
  // se aplica el filtro para el select de dias
  filtroExactoDia(property: string, regla: any) {
    this.servicio.filtroExactoDia(property, regla);
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
  }
  // funcion que ejecuta el boton para eliminar los filtros de cada select
  eliminarFiltro(property: string) {
    this.servicio.eliminarFiltro(property);
    delete this.filtros[property];
    this[property] = null;
    this.servicio.aplicarFiltros();
    this.filtro = true;
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
  }

  // funcion que muestra el grafico
  mostrarGrafico() {

    // se recorre todo el arreglo de objetos de las temperaturas filtradas
    for (let i = 0; i < Object.keys(this.temperaturasFiltradas).length; i++) {

      // se convierten los valores de las temperaturas a enteros para su push al arreglo para el grafico
      // console.log(parseInt(Object.values(Object.values(this.temperaturasFiltradas[i].valor).join('')).join('')));
      // tslint:disable-next-line:max-line-length
      this.arrayx.push(Object.values(Object.values(this.temperaturasFiltradas[i].hora).join('')).join('')); // datos de las X que son las horas de cada temperatura
      this.arrayy
        // tslint:disable-next-line:radix
        .push(parseInt(Object.values(Object.values(this.temperaturasFiltradas[i].valor).join(''))
          .join(''))); // datos de las Y que son las temperaturas de cada hora
    }

    // se emite la señal para que el componente del grafico agarre los valores desde este componente
    this.chart = true;
  }
  // funcion que oculta el grafico
  cerrarGrafico() {

    // se anulan todos los valores del grafico para su apertura de nuevo sin ningun problema
    this.chart = false;
    this.arrayx = [];
    this.arrayy = [];
    this.numeroElemento = [];
  }

  // funcion que muestra los detalles
  onClick(elemento) {
    console.log('Detalles Mostrado');
    this.elemento = elemento;
    this.detallesElemento = true;

    // hace un scroll al final de la pagina
    $(window).ready(function () {
      $('html, body').animate({ scrollTop: $(document).height() }, 1000);
    });
  }

  // funcion que cierra los detalles
  cerrarDetalles() {
    // hace un scroll al principio de la pagina
    $(window).ready(function () {
      $('html, body').animate({ scrollTop: 0 }, 1000);
      return false;
    });
    this.elemento = null;
  }
}
