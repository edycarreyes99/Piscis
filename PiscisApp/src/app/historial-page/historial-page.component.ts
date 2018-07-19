import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service'
import { MatDialog } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import * as _ from 'lodash';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { PropertyRead } from '@angular/compiler';
import { Chart } from 'chart.js'
import * as M from 'materialize-css';
import * as $ from 'jquery';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import * as WOW from 'wowjs';
import {MatTableModule} from '@angular/material/table';
declare var Plotly: any;
@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.scss']
})
export class HistorialPageComponent implements OnDestroy, OnInit {
  title = 'Temperaturas';
  @ViewChild('chart') el: ElementRef;
  contactos: any[];
  fecha = new Date();
  anos = ['Todos', `${this.fecha.getFullYear()}`];
  meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  dias = []
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
  j

  constructor(
    private servicio: AuthService,
    private dialog: MatDialog,
    private db: AngularFireDatabase,
    private http: Http
  ) { }
  temperaturas: any;
  temperaturasFiltradas: any;

  //propiedades del filtrado
  ano: string;
  mes: string;
  dia: string;
  filtro = true;
  persons: any = [];
  //reglas de filtros activos
  filtros = {}

  ngOnInit() {

    M.AutoInit();
    //WOW.init();
    //se extraen los datos por primera vez... En este caso se mostraran todos los datos la primera vez que se cargue la pagina antes de aplicar los filtros.
    this.db.list('/contactos').snapshotChanges()
      .map(temperaturas => {
        let values = temperaturas.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
        return temperaturas.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })
      .subscribe(temperaturas => {
        this.temperaturas = temperaturas;
        for (var j = 0; j < Object.keys(this.temperaturas).length; j++) {
            this.numeroElemento.push(j);
          }
          console.log(this.numeroElemento);
      })

    //se llaman a las funciones desde el servicio y se igualan todas las variables.
    this.servicio.extraerDatos();
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtros = this.servicio.filtros;
  }
  ngOnDestroy(): void {
  }
  //se aplica el filtro para el select de años
  filtroExactoAno(property: string, regla: any) {
    this.numeroElementoFiltrado = [];
    this.servicio.filtroExactoAno(property, regla);
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
  }

  //se aplica el filtro para el select de mes
  filtroExactoMes(property: string, regla: any) {
    this.servicio.filtroExactoMes(property, regla);
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
  }
  //se aplica el filtro para el select de dias
  filtroExactoDia(property: string, regla: any) {
    this.servicio.filtroExactoDia(property, regla);
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
    this.temperaturasFiltradas.map(charts => {
      let values = charts.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
      //console.log(values);
    })
  }
  //funcion que ejecuta el boton para eliminar los filtros de cada select
  eliminarFiltro(property: string) {
    this.servicio.eliminarFiltro(property)
    delete this.filtros[property]
    this[property] = null
    this.servicio.aplicarFiltros();
    this.filtro = true;
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas;
    this.temperaturas = this.servicio.temperaturas;
    this.temperatura = this.servicio.temperatura;
    this.filtro = this.servicio.filtro;
    this.filtros = this.servicio.filtros;
  }

  //funcion que muestra el grafico
  mostrarGrafico() {
    //se dan a conocer los objetos de las temperaturas filtradas
    //console.log('Las temperaturas Filtradas son: '+Object.entries(this.temperaturasFiltradas));

    //se mapean todos los objetos de las temperaturas filtradas
    this.temperaturasFiltradas.map(tf => {
      //console.log(Object.keys(tf).length)    
    })

    //se recorre todo el arreglo de objetos de las temperaturas filtradas
    for (var i = 0; i < Object.keys(this.temperaturasFiltradas).length; i++) {
      //se convierten los valores de las temperaturas a enteros para su push al arreglo para el grafico
      //console.log(parseInt(Object.values(Object.values(this.temperaturasFiltradas[i].valor).join("")).join("")));
      this.arrayx.push(Object.values(Object.values(this.temperaturasFiltradas[i].hora).join("")).join(""));//datos de las X que son las horas de cada temperatura
      this.arrayy.push(parseInt(Object.values(Object.values(this.temperaturasFiltradas[i].valor).join("")).join("")));//datos de las Y que son las temperaturas de cada hora
    }

    //se emite en consola el arreglo en Y
    //console.log(Object.values(this.arrayy));

    //se emite la señal para que el componente del grafico agarre los valores desde este componente
    this.chart = true;
  }
  //funcion que oculta el grafico
  cerrarGrafico() {
    this.chart = false;
    this.arrayx = [];
    this.arrayy = [];
    this.numeroElemento = [];
  }

  onClick(elemento) {
    console.log('Detalles Mostrado');
    this.elemento = elemento;
    this.detallesElemento = true;
    $(window).ready( function() {
      $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    });
  }
  cerrarDetalles() {
    $(window).ready(function() {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });
    this.elemento = null;
  }
}