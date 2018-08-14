import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";

import * as M from 'materialize-css';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;
  public userDoc: AngularFirestoreDocument<any>;
  public user: Observable<any>;
  constructor(
    public authService: AuthService,
    public router: Router,
    public navbar: NavbarComponent,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    M.AutoInit();
  }

  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
      .then((res) => {
        this.authService.verificaUsuario();
        this.router.navigate(['/privado']);
      }).catch((err) => {
        console.log(err);
      });
  }
  onSubmitLogin() {
    this.authService.loginEmail(this.email, this.password)
      .then((res) => {
        this.authService.getAuth().subscribe(user => {
          this.userDoc = this.afs.doc(`Piscis/Users/Administradores/${this.authService.afAuth.auth.currentUser.email}`);
          this.userDoc.update({ password: this.password });
          if (user.emailVerified) {
            this.router.navigate(['/historial']);
          } else {
            this.router.navigate(['/privado']);
          }
        })
      }).catch((err) => {
        this.router.navigate(['/login']);
        console.log(err);
      })
  }
}
