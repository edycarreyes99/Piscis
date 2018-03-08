import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../auth.service';
import {NavbarComponent} from '../navbar/navbar.component';
@Injectable()
export class VerifiedContentOnlyGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private navbar: NavbarComponent,
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(authenticated=>{
        if(authenticated)
        {
          if(this.navbar.isVerified.valueOf())
          {
            this.router.navigate(['/historial']);
          }else{
            this.router.navigate(['/privado']);
          }
        }else{
          this.router.navigate(['/login']);
        }
      });
  }
}
