import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import {MatDialog} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';
import * as _ from 'lodash';
@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.scss']
})
export class HistorialPageComponent implements OnInit{
  title = 'Temperaturas';
  contactos: any[];
  fecha= new Date();
  anos = ['Todos',`${this.fecha.getFullYear()}`];
  meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];
    dias = []
  contacto = null;
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
    this.db.list('/contactos')
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
  private aplicarFiltros(){
      this.temperaturasFiltradas = _.filter(this.temperaturas, _.conforms(this.filtros))
  }

  filtroExactoAno(property: string, regla:any){
    let query = null;
    this.filtros[property] = val => val == regla
    this.aplicarFiltros()
  }
  filtroExactoMes(property: string, regla: any){
    this.filtros[property] = val=>val ==regla
    this.aplicarFiltros()
  }
  filtroExactoDia(property: string, regla: any){
    this.filtros[property] = val=>val ==regla
    this.aplicarFiltros()
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
  
  onClick(temperatura){
    this.temperatura = temperatura;
  }
  cerrarDetalles(){
    this.temperatura = null;
  }
}