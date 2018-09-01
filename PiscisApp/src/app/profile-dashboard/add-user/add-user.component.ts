import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {AuthService} from '../../auth.service';
import * as M from 'materialize-css';
declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  nombre : string;
  apellido: string;
  username;
  email : string;
  password: string;
  passwordconfirm:string;
  constructor(private _formBuilder: FormBuilder,public auth:AuthService) { }

  ngOnInit() {
    M.AutoInit();
    console.log("Se Ha Creado el Usuario: "+this.nombre+" "+this.apellido);
  }
  generarUsername(){
    this.username = this.nombre.substr(0,1)+this.apellido;
  }
  crearUsuario() {
    var nombreLength = this.nombre.length;
    var apellidoLength = this.apellido.length;
    if (this.nombre == '') {
      M.toast({ html: 'Primero Ingrese un Nombre' });
    }else if(this.apellido == ''){
      M.toast({ html: 'Primero Ingrese un Apellido' });
    }else if((nombreLength<4) || (apellidoLength<4)){
      M.toast({ html: 'El Nombre y/o apellido deben ser mayor a 3 caracteres' });
    }else{
      if (this.password != this.passwordconfirm) {
        M.toast({ html: 'Lo Sentimos las Contraseñas no son Identicas' });
      } else if (this.password.length < 6) {
        M.toast({ html: 'La contraseña debe tener al menos 6 caracteres' });
      }else if($('#password').val() == ''){
        M.toast({ html: 'Ingrese una contraseña para actualizarla' });
      }else if($('#passwordconfirm').val() == ''){
        M.toast({ html: 'Debe de Confirmar la Contraseña' });
      } else {
        console.log("Se Ha Creado el Usuario: "+this.username);
        /*this.auth.registerUser(this.email,this.password).then(user=>{
          
        }).catch(e=>{

        });*/
      }
    }
  }

}
