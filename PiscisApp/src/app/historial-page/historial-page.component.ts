import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {AuthService} from '../auth.service'
import {MatDialog} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';
import * as _ from 'lodash';
import { DocumentSnapshot } from '@firebase/firestore-types';
declare var Plotly: any;
@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.scss']
})
export class HistorialPageComponent implements OnInit{
  title = 'Temperaturas';
  @ViewChild('chart') el: ElementRef;
  contactos: any[];
  fecha= new Date();
  anos = ['Todos',`${this.fecha.getFullYear()}`];
  meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];
    dias = []
  contacto = null;
  chart = false;
  temperatura = null;
  contactoEditar = null;
  contactoAgregar=false;

  constructor(
    private servicio: AuthService,
    private dialog: MatDialog,
    private db : AngularFireDatabase
  ){}
  temperaturas : any;
  temperaturasFiltradas: any;
  //propiedades del filtrado
  ano: string;
  mes: string;
  dia: string;
  filtro = true;

  //reglas de filtros activos
  filtros = {}
  ngOnInit(){
    for(var i=1; i<=31; i++)
    {
      this.dias = this.dias.concat(`${i}`);
    }
    if(this.fecha.getFullYear()!=2018)
    {
      this.anos = this.anos.concat(`${this.fecha.getFullYear()}`);
    }
    this.db.list('/contactos').snapshotChanges()
    .map(temperaturas=>{
      let values = temperaturas.map(c=>({
        key: c.payload.key, ...c.payload.val()
      }))
      console.log(values);
      return temperaturas.map(c=>({key: c.payload.key, ...c.payload.val()}))
    })
    .subscribe(temperaturas=>{
      this.temperaturas = temperaturas;
    })
    /*this.servicio.getContactos().snapshotChanges()
    .map(changes =>{
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    })
    .subscribe(contactos => {
      this.contactos = contactos
      //this.ciudades = this.ciudades.concat(contactos);

    });*/
  }
  //funcion que aplica los filtros cuando se establece cada parametro en los select
  private aplicarFiltros(){
      this.temperaturasFiltradas = _.filter(this.temperaturas, _.conforms(this.filtros))
      this.contacto = null;
      this.filtro = false;
  }
//se aplica el filtro para el select de años
  filtroExactoAno(property: string, regla:any){
    let query = null;
    this.filtros[property] = val => val == regla
    this.aplicarFiltros()
  }
  //se aplica el filtro para el select de mes
  filtroExactoMes(property: string, regla: any){
    this.filtros[property] = val=>val ==regla
    this.aplicarFiltros()
  }
  //se aplica el filtro para el select de dias
  filtroExactoDia(property: string, regla: any){
    this.filtros[property] = val=>val ==regla
    this.aplicarFiltros()
  }
  //funcion que ejecuta el boton para eliminar los filtros de cada select
  eliminarFiltro(property: string){
    delete this.filtros[property]
    this[property]=null
    this.aplicarFiltros();
    this.filtro= true;
  }

  //funcion que muestra el grafico
  mostrarGrafico(){
    this.chart=true;
  }
  //funcion que oculta el grafico
  cerrarGrafico(){
    this.chart=false;
  }

  /*onSelect($event){
    let query = null;
    if($event.value == "Todos")
      query= this.servicio.getContactos();
    else
      query = this.servicio.getContactosFiltro($event.value);
    query.snapshotChanges()
    .map(changes =>{
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }))
    }).subscribe(contactos =>{
      this.contactos = contactos;
    })
    this.contacto = null;
  }*/
  
  onClick(contacto){
    this.contacto = contacto;
  }
  cerrarDetalles(){
    this.contacto = null;
  }
}