import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ServicioService {
  constructor(
    public afAuth: AngularFireAuth,
  ) { }



  registerUser(email, pass) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  loginEmail(email, pass) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  getAuth() {
    return this.afAuth.authState.map(user => user);
  }

  /*logout() {
    this.router.navigate(['/']);
    return this.afAuth.auth.signOut().then(function () {
      console.log("Se ha cerrado sesion");
      location.reload();
    }).catch(function (error) {
      console.log(error);
    });
  }*/

  verificaUsuario() {
    var user = this.afAuth.auth.currentUser;

    user.sendEmailVerification().then(function () {
      //email sent
      console.log('Mensaje de Confirmacion Enviado');
    }).catch(function (error) {
      console.log(error);
    })
  }
  emailVerified() {

  }
}