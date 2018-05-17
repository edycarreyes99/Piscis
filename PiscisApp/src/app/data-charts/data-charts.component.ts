import { Component, OnInit, ViewChild, ElementRef,Input,Output,EventEmitter } from '@angular/core';
import {AuthService} from '../auth.service'
import {MatDialog} from '@angular/material';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as _ from 'lodash';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import {HistorialPageComponent} from '../historial-page/historial-page.component';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { reject } from 'q';
import 'rxjs/add/operator/map';
//import { AngularFireDatabase} from 'angularfire2/database';
import { InjectFlags } from '@angular/core/src/render3/di';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';



interface Note{
  hora: string;
  valor: number;
}
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
  arrayx: any;
  arrayy:any;
  af: AngularFirestoreCollection<any>



  constructor(
    private servicio: AuthService,
    private historial: HistorialPageComponent,
   ){}
   temperaturasFiltradas : any;
   ngOnInit(){
    
     //se reciben las temperaturas filtradas desde el servicio
     this.temperaturasFiltradas = this.servicio.temperaturasFiltradas
     //console.log("chart abierto");
     //se reciben los arreglos desde el componente de historial
     this.arrayx = this.historial.arrayx;
     this.arrayy = this.historial.arrayy;
     //se emiten por consola los arreglos recibidos desde historial
     //console.log('el arreglo de x es: '+this.arrayx);
     //console.log('el arreglo de y es: '+this.arrayy);
     //this.getReportValues();
     this.createChart();
     //se emiten las temperaturas filtradas recibidas desde el servicio
     //console.log('temperaturas filtradas en data charts'+this.temperaturasFiltradas);
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
   //this.arrayx.push(1,2,3,4,5);
   //this.arrayy.push(1,2,4,8,16);
 }
 }