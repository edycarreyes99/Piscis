import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  
  constructor(
    public authService : AuthService,
    public router : Router,
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user=>{
      if(user)
      {
        this.isLogin=true;
        console.log("Hay Usuarios Activos");
      }else{
        this.isLogin=false;
        console.log("No hay Usuarios Activos");
      }
    })
  }

  cerrar(){
     this.authService.logout();
}
}