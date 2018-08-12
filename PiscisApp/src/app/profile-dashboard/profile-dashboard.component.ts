import { Component, OnInit,Input } from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';

@Component({
  selector: 'app-profile-dashboard',
  //templateUrl: './builded/examples/dashboard.html',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {
url: string;
userDoc:AngularFirestoreDocument<any>;
user:Observable<any>;
public uuid: string;
  constructor(
    public http:Http,
    public auth:AuthService,
    public router:Router,
    public afs:AngularFirestore
  ) { }

  ngOnInit() {
    this.userDoc = this.afs.doc('Piscis/Users/Administradores/ereyes');
    this.user = this.userDoc.valueChanges();
    this.auth.getAuth().subscribe(user=>{
      this.url = user.photoURL;
      //console.log('imagen actualizada');
    });
  }
}
