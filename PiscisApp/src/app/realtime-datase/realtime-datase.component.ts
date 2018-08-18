import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from "angularfire2/database";
import { AuthService } from "../auth.service";
import {Observable} from 'rxjs/Observable';
import { Action } from '../../../node_modules/rxjs/scheduler/Action';

@Component({
  selector: 'app-realtime-datase',
  templateUrl: './realtime-datase.component.html',
  styleUrls: ['./realtime-datase.component.scss']
})
export class RealtimeDataseComponent implements OnInit {
  public databaseRef: AngularFireObject<any>
  public realTimeData:Observable<any>;
  constructor(
    public db : AngularFireDatabase,
    public auth : AuthService
  ) { }

  ngOnInit() {
    this.databaseRef = this.db.object("Tiempo_Real");
    this.databaseRef.snapshotChanges().subscribe(action=>{
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      this.realTimeData = action.payload.val();
    })

  }

}
