import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service'
import {MatDialog} from '@angular/material';
import {Subject} from 'rxjs/Subject';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Temperaturas';
  
  constructor(){}
    

  ngOnInit(){
    
  }
  
}