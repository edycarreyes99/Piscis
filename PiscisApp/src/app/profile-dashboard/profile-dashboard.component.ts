import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NavbarComponent } from "../navbar/navbar.component";
import * as M from 'materialize-css';

@Component({
  selector: 'app-profile-dashboard',
  //templateUrl: './builded/examples/dashboard.html',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {
  photoURL: string;
  nombre: string;
  apellido: string;
  username: string;
  public uid: string;
  email: string;
  password: string;
  passwordconfirm: string;
  passwordSaved: string;
  sexo: CharacterData;
  bio: string;
  public userDoc: AngularFirestoreDocument<any>;
  public userCol: AngularFirestoreCollection<any>
  public user: Observable<any>;
  public datos: any;
  constructor(
    public http: Http,
    public auth: AuthService,
    public router: Router,
    public afs: AngularFirestore
  ) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.userDoc = this.afs.doc(`Piscis/Users/Administradores/${this.auth.afAuth.auth.currentUser.email}`);
      this.userCol = this.afs.collection(`Piscis/Users/Administradores`, ref => ref.where('userid', '==', `${this.auth.afAuth.auth.currentUser.uid}`));
      this.user = this.userDoc.valueChanges();
      this.datos = this.userCol.snapshotChanges().subscribe(async data => {
        data.map(datas => {
          this.email = datas.payload.doc.data().Correo;
          this.nombre = datas.payload.doc.data().Nombre;
          this.apellido = datas.payload.doc.data().Apellido;
          this.username = datas.payload.doc.data().username;
          this.photoURL = datas.payload.doc.data().photoURL;
          this.uid = datas.payload.doc.data().userid;
          this.passwordSaved = datas.payload.doc.data().password;
        });
      });
    });
  }

  ngOnInit() {
    M.AutoInit();
  }
  toast() {
    M.toast({ html: 'Imagen Actualizada' })
  }

  actualizarContrasena() {
    if (this.password != this.passwordconfirm) {
      M.toast({ html: 'Lo Sentimos las Contraseñas no son Identicas' });
    } else if (this.password.length < 6) {
      M.toast({ html: 'La contraseña debe tener al menos 6 caracteres' });
    }else if($('#password').val() == ''){
      M.toast({ html: 'Ingrese una contraseña para actualizarla' });
    }else if($('#passwordconfirm').val() == ''){
      M.toast({ html: 'Debe de Confirmar la Contraseña' });
    } else {
      this.auth.loginEmail(this.email, this.passwordSaved).then((res) => {
        this.auth.getAuth().subscribe(usr => {
          usr.updatePassword(this.password);
        });
        M.toast({ html: `Contraseña Actualizada!` })
        this.router.navigate(['/']).then(navigation => {
          this.auth.logout();
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  actualizarDatosPerfil() {
    if (this.password != this.passwordconfirm) {
      M.toast({ html: 'Lo Sentimos las Contraseñas no son Identicas' });
      return 0;
    } else if ($('#textareaBio').val() == '') {
      M.toast({html:'No hay datos para actualizar :('});
    } else {
      this.userDoc.update({ bio: this.bio });
      $('#textareaBio').val('');
      M.toast({ html: `Datos del perfil de ${this.nombre} ${this.apellido} Actualizados!` })
    }
  }
}
