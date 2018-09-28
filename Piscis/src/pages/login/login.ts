import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { ServicioService } from "../../services/servicio.service";

import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

import { User } from '../../providers';
import { MainPage } from '../';
import { HistorialPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  email: string;
  password: string;

  // Our translated text strings
  private loginErrorString: string;
  userDoc: any;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public servicio: ServicioService,
    public afs: AngularFirestore
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {
    /*this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });*/
    this.servicio.loginEmail(this.email, this.password)
      .then((res) => {
        this.servicio.getAuth().subscribe(user => {
          this.userDoc = this.afs.doc(`Piscis/Users/Administradores/${this.servicio.afAuth.auth.currentUser.email}`);
          this.userDoc.update({ password: this.password });
          if (user.emailVerified) {
            this.navCtrl.setRoot(HistorialPage);
            let toast = this.toastCtrl.create({
              message: `Bienvenido ${user.email}`,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: `Bienvenido ${user.email}`,
              duration: 3000,
              position: 'top'
            });
            toast.present();
            this.navCtrl.setRoot(MainPage);
          }
        });
      }).catch((err) => {
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        console.log(err);
      });
  }
}
