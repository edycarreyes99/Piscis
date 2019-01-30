import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Sort } from "@angular/material";
import * as _ from 'lodash';

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
  selector: 'historial-page',
  templateUrl: 'historial.html'
})

export class HistorialPage {
  coleccionHistorial: AngularFirestoreCollection<historialDocumentos>;
  documentos: historialDocumentos[];
  documentosFiltrados:historialDocumentos;
  documentosStorage: historialDocumentos[];
  sortedData: historialDocumentos[];
  dias: Array<number> = [];
  meses: Array<String> = [];
  anos: Array<number> = [];
  dia: number = null;
  mes: String = null;
  ano: number = null;
  filtros = {};
  filtro = true;
  mesesDataMap: Array<String> = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  datasource;
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  constructor(public storage: Storage, public navCtrl: NavController, public fs: AngularFirestore, public alert: AlertController) {

  }
  detalles(documento: historialDocumentos) {
    this.navCtrl.push('DetallesPage', {
      documento: documento
    });
  }

  eliminarDocumento(documento: historialDocumentos) {
    var alerta = false;
    const alert = this.alert.create({
      title: 'Eliminar Documento',
      subTitle: `${documento.private_key_id}`,
      message: '¿Estas seguro que deseas eliminar este documento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.fs.doc(`Piscis/Historial/Sensores/${documento.private_key_id}`).delete().then((x) => {
              const alert = this.alert.create({
                title: 'Hecho',
                message: 'Documento eliminado con éxito',
                buttons: [
                  {
                    text: 'Aceptar'
                  }
                ]
              });
              alert.present();
            });
            this.storage.set('documentos', this.documentos);
          }
        },
      ]
    })
    alert.present();
    if (alerta) {

    } else {
      alerta = false;
    }
    //this.fs.doc(`Piscis/Historial/Sensores/${documento.private_key_id}`).delete();
  }
  //funcion para aplicar cada uno de los filtros al seleccionarlos
  aplicarFiltros() {
    this.documentosFiltrados = _.filter(this.documentos, _.conforms(this.filtros));
    this.filtro = false;
  }

  filtroExactoAno(propiedad:string, regla:any) {
    this.filtros[propiedad] = val => val == regla;
    this.aplicarFiltros();
  }
  
  filtroExactoMes(propiedad:string, regla:any) {
    this.filtros[propiedad] = val => val == regla;
    this.aplicarFiltros();
  }
  
  filtroExactoDia(propiedad:string,regla:any) {
    this.filtros[propiedad] = val => val == regla;
    this.aplicarFiltros();
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
    var i = 0;
    do {
      this.dias.push(i + 1);
      i++;
    } while (i <= 30)
    i = 0;
    do {
      this.meses.push(this.mesesDataMap[i]);
      i++;
    } while (i <= 11)
    i = 2018;
    do {
      this.anos.push(i);
      i++;
    } while (i <= 2030)
    //console.log(this.anos);
    this.storage.get('documentos').then((documentos) => {
      this.documentos = documentos;
    });
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
      this.storage.set('documentos', this.documentos);
    });
  }
  displayedColumns = ['ID', 'Acciones'];

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

