import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
isLogin = false;
isVerified = false;
  constructor(
    public router:Router,
    public service:AuthService
  ) { }

  ngOnInit() {
    this.service.getAuth().subscribe(user=>{
      if(user){
        if(user.emailVerified){
          this.isVerified = true
        }else{
          this.isVerified = false;
        }
        this.isLogin = true;
        console.log("hay usuarios para el home");
      }else{
        this.isLogin = false;
      }
    })
  }

}
