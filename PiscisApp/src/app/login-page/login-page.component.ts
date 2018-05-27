import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public email: string;
  public password: string;
  constructor(
    public authService: AuthService,
    public router: Router,
    public navbar: NavbarComponent,
  ) { }

  ngOnInit() {
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
        if (this.navbar.isVerified) {
          this.router.navigate(['/historial']);
        } else {
          this.router.navigate(['/privado']);
        }
      }).catch((err) => {
        this.router.navigate(['/login']);
        console.log(err);
      })
  }
}
