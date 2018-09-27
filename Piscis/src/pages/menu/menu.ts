import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController) {

  }

  
  ionViewDidEnter() {
  }

    
}
