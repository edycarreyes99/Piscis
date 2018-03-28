import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { promise } from 'protractor';
import { reject } from 'q';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
//import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { InjectFlags } from '@angular/core/src/render3/di';

@Injectable()
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private af: AngularFireDatabase
  ) { }

  /*getContactos(){
    this.contactos = this.af.list('/contactos');
    return this.contactos;
  }

  getContactosFiltro(filtro){
      this.contactos = this.af.list('/contactos', ref => ref.orderByChild('hora').equalTo(filtro)) ;
      return this.contactos;
  }*/

  registerUser(email, pass){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData),
      err => reject(err));
    });
  }

  loginEmail(email, pass){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,pass)
      .then( userData => resolve(userData),
      err => reject(err));
    });
  }

  getAuth(){
    return this.afAuth.authState.map (user => user);
  }

  logout(){
    return this.afAuth.auth.signOut().then(function(){
      this.router.navigate(['/']);
      console.log("Se ha cerrado sesion");
    }).catch(function(error){
      console.log(error);
    });
  }

  verificaUsuario(){
    var user = this.afAuth.auth.currentUser;

    user.sendEmailVerification().then(function(){
      //email sent
      console.log('Mensaje de Confirmacion Enviado');
    }).catch(function(error){
      console.log(error);
    })
  }

}