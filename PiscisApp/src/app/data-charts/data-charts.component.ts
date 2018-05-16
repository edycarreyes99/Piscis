import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from '../auth.service'
import {MatDialog} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as _ from 'lodash';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import {HistorialPageComponent} from '../historial-page/historial-page.component';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.scss']
})
export class DataChartsComponent implements OnInit{
  @ViewChild('chart') el: ElementRef;
  data: Observable<any[]>;
  banderita: boolean;
  ref: AngularFireList<any>;
  chartData = null;
  arrayx = []
  arrayy = [];



  constructor(
   private servicio: AuthService,
   private historial: HistorialPageComponent,
  ){}
  temperaturasFiltradas : any;
  ngOnInit(){
    this.banderita = this.servicio.banderita;
    console.log("se recibio la bandera verde de dia");
    this.temperaturasFiltradas = this.servicio.temperaturasFiltradas
    console.log("chart abierto");
    //this.getReportValues();
    this.temperaturasFiltradas.map(temperaturaGrafico=>{
      temperaturaGrafico.map(c=>{
        this.arrayx = c.payload.val().hora;
        this.arrayy = c.payload.val().valor;
      })
    })
    this.arrayx = this.servicio.arrayx;
    this.arrayy = this.servicio.arrayy;
    this.createChart();
    console.log('el arreglo de x es: '+this.arrayx);
    console.log('el arreglo de y es: '+this.arrayy);
}

createChart(){
  const element = this.el.nativeElement;
  const data= [{
    x:this.arrayx,
    y:this.arrayy
  }]

  const style ={
    margin: {t:0}
  }
  Plotly.plot(element,data,style);
}

getReportValues(){
  this.arrayx = this.servicio.arrayx;
  this.arrayy = this.servicio.arrayy;
  this.arrayx.push([1,2,3,4,5]);
  this.arrayy.push([1,2,4,8,16]);
}
}