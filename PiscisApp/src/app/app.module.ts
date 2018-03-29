import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PrivadoPageComponent } from './privado-page/privado-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HistorialPageComponent } from './historial-page/historial-page.component';
import {AuthService} from './auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from 'angularfire2';
import { DetallesComponent } from './detalles/detalles.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {AuthContentOnlyGuard} from './guards/auth-content-only.guard';
//import {AngularFirestoreModule} from 'angularfire2/firestore';
export const firebaseConfig={
  apiKey: "AIzaSyBu_Yb1UXx6W12dkeSYvr7aj9ueNwj0NLQ",
  authDomain: "proyecto-robotica-35bed.firebaseapp.com",
  databaseURL: "https://proyecto-robotica-35bed.firebaseio.com",
  storageBucket: "proyecto-robotica-35bed.appspot.com",
  messagingSenderId: "990553561020"
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    RegisterPageComponent,
    LoginPageComponent,
    PrivadoPageComponent,
    NotFoundPageComponent,
    HistorialPageComponent,
    DetallesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    
  ],
  providers: [AuthService,AuthContentOnlyGuard,NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
