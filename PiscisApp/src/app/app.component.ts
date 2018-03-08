import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {MatDialog} from '@angular/material';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Piscis';
  contactos: any[];
  ciudades = ['Todos', 'Quito','Guayaquil','Riobamba'];
  contacto = null;
  contactoEditar = null;
  contactoAgregar=false;

  constructor(
    private servicio: AuthService,
    private dialog: MatDialog){}
  ngOnInit(){
    this.servicio.getContactos().snapshotChanges()
    .map(changes =>{
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    })
    .subscribe(contactos => this.contactos = contactos);
  }
  onSelect(event){
    let query = null;
    if(event.value == "Todos")
      query= this.servicio.getContactos();
    else
      query = this.servicio.getContactosFiltro(event.value);
    query.snapshotChanges()
    .map(changes =>{
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    }).subscribe(contactos =>{
      this.contactos = contactos;
    })
    this.contacto = null;
  }
  
  onClick(contacto){
    this.contacto = contacto;
  }
  cerrarDetalles(){
    this.contacto = null;
  }
}