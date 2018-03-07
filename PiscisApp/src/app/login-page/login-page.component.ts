import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
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
  ) { }

  ngOnInit() {
  }

  onSubmitAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then((res)=>{
      this.authService.verificaUsuario();
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      console.log(err);
    });
  }
  onSubmitLogin(){
    this.authService.loginEmail(this.email, this.password)
    .then((res)=>{
      this.router.navigate(['/privado']);
    }).catch((err)=>{
      this.router.navigate(['/login']);
      console.log(err);
    })
  }
}
