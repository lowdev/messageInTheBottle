import {
  RouterStateSnapshot, ActivatedRouteSnapshot, Router,
  CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from 'ng2-ui-auth';

/**
 * Created by Ron on 03/10/2016.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        next:  ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
      if (this.auth.isAuthenticated()) {
        return true;
      }

      console.log('unauthenticated navigating to login');
      this.router.navigateByUrl('introduction');
      return false;
    }
}
