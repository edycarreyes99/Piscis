import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {PrivadoPageComponent} from './privado-page/privado-page.component';
import {NotFoundPageComponent} from './not-found-page/not-found-page.component';
import {HistorialPageComponent} from './historial-page/historial-page.component'
import {AuthContentOnlyGuard} from './guards/auth-content-only.guard';
import {NavbarComponent} from './navbar/navbar.component';
import {DataChartsComponent} from './data-charts/data-charts.component';
import {ProfileDashboardComponent} from './profile-dashboard/profile-dashboard.component'
import {MonitoreoComponent} from './monitoreo/monitoreo.component';
import {AddUserComponent} from './profile-dashboard/add-user/add-user.component';
import {RealtimeDataseComponent} from './realtime-datase/realtime-datase.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'privado', component: PrivadoPageComponent,canActivate:[AuthContentOnlyGuard]},
  {path: 'historial', component: HistorialPageComponent,canActivate:[AuthContentOnlyGuard]},
  {path: 'dataCharts', component: DataChartsComponent},
  {path: 'dashboard', component: ProfileDashboardComponent},
  {path: 'streaming', component: MonitoreoComponent},
  {path: 'addUser', component: AddUserComponent},
  {path: 'realtime', component: RealtimeDataseComponent},
  {path: '**', component: NotFoundPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
