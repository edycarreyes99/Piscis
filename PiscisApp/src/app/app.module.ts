//Config Modules Start
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTablesModule} from 'angular-datatables';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NgwWowModule } from 'ngx-wow';

//MDBootstrap Module Start
import { MDBBootstrapModule } from "angular-bootstrap-md";

//Components Start
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PrivadoPageComponent } from './privado-page/privado-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HistorialPageComponent } from './historial-page/historial-page.component';
import {DataChartsComponent} from './data-charts/data-charts.component';
import { DetallesComponent } from './detalles/detalles.component';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { MonitoreoComponent } from './monitoreo/monitoreo.component';
import { AddUserComponent } from './profile-dashboard/add-user/add-user.component';
import { SidenavDashboardComponent } from './profile-dashboard/sidenav-dashboard/sidenav-dashboard.component';
import { RealtimeDataseComponent } from './realtime-datase/realtime-datase.component';

//App Services Start
import {AuthService} from './auth.service';
import {environment} from '../environments/environment';
import {AuthContentOnlyGuard} from './guards/auth-content-only.guard';

//AngularFire2 Modules Start
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireStorageModule } from "angularfire2/storage";

//Directives Start
import { DropZoneDirective } from './profile-dashboard/drop-zone.directive';
import { FileUploadComponent } from './profile-dashboard/file-upload/file-upload.component';

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
    DataChartsComponent,
    ProfileDashboardComponent,
    MonitoreoComponent,
    AddUserComponent,
    SidenavDashboardComponent,
    RealtimeDataseComponent,
    DropZoneDirective,
    FileUploadComponent
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
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DataTablesModule,
    NgwWowModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [AuthService,AuthContentOnlyGuard,NavbarComponent,SidenavDashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
