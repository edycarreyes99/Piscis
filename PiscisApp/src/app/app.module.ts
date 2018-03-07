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
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {AuthContentOnlyGuard} from './guards/auth-content-only.guard';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
  ],
  providers: [AuthService,AuthContentOnlyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
