import { Component, OnInit,Input } from '@angular/core';
import {Http} from '@angular/http';
import {AuthService} from '../auth.service';
declare var uploadcare: any;

@Component({
  selector: 'app-profile-dashboard',
  //templateUrl: './builded/examples/dashboard.html',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {
url: string;
public uuid: string;
  constructor(
    public http:Http,
    public auth:AuthService
  ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(user=>{
      this.url = user.photoURL;
      console.log(this.url);
    });
  }

cambiarImagen(){
  location.reload();
}
}
