import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from '../auth.service'
import {MatDialog} from '@angular/material';
import {AngularFireDatabase} from 'angularfire2/database';
import * as _ from 'lodash';
import { DocumentSnapshot } from '@firebase/firestore-types';
@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.scss']
})
export class DataChartsComponent implements OnInit{
  @ViewChild('chart') el: ElementRef;

  constructor(
   private auth: AuthService
  ){}
  
  ngOnInit(){
    this.basicChart()
}

basicChart(){
  const element = this.el.nativeElement;
  const data= [{
    x:[1,2,3,4,5],
    y:[1,2,4,8,16]
  }]

  const style ={
    margin: {t:0}
  }
  Plotly.plot(element,data,style);
}
}