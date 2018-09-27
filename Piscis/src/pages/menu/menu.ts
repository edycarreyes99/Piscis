import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Sort } from "@angular/material";

export interface historialDocumentos {
  private_key_id: string,
  ano: number,
  mes: string,
  fecha: string,
  dia: number,
  hora: number,
  minutos: number,
  segundos: number,
  tiempo: string,
  temperatura: number,
  humedad: number,
  nivel_agua: number,
  nivel_purificacion: number,
  oxigeno: number,
  ph: number,
  turbidad: number,
  viscosidad: number
}
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  coleccionHistorial: AngularFirestoreCollection<historialDocumentos>;
  documentos: historialDocumentos[];
  sortedData: historialDocumentos[];
  datasource;
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, public fs: AngularFirestore) {

  }

  sortData(sort: Sort) {
    const data = this.documentos.slice();
    if (!sort.active || sort.direction === '') {
      this.documentos = data;
      return;
    }

    this.documentos = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return compare(a.dia, b.dia, isAsc);
        default: return 0;
      }
    });
    console.log(sort.active + sort.direction);
  }

  ionViewDidEnter() {

    this.coleccionHistorial = this.fs.collection('Piscis/Historial/Sensores');
    this.coleccionHistorial.snapshotChanges().subscribe(documentos => {
      this.documentos = documentos.map(documento => {
        return {
          private_key_id: documento.payload.doc.data().Private_Key_Id,
          ano: documento.payload.doc.data().Año,
          mes: documento.payload.doc.data().Mes,
          dia: documento.payload.doc.data().Dia,
          fecha: documento.payload.doc.data().Fecha,
          hora: documento.payload.doc.data().Hora,
          minutos: documento.payload.doc.data().Minuto,
          segundos: documento.payload.doc.data().Segundo,
          tiempo: documento.payload.doc.data().Tiempo,
          temperatura: documento.payload.doc.data().Temperatura,
          humedad: documento.payload.doc.data().Humedad,
          nivel_agua: documento.payload.doc.data().Nivel_Agua,
          nivel_purificacion: documento.payload.doc.data().Nivel_Purificacion,
          oxigeno: documento.payload.doc.data().Oxigeno,
          ph: documento.payload.doc.data().PH,
          turbidad: documento.payload.doc.data().Turbidad,
          viscosidad: documento.payload.doc.data().Viscosidad,
        }
      });
    });
  }
  displayedColumns = ['ID', 'Acciones'];
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}