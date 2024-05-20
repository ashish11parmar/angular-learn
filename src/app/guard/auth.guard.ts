import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(
    private router: Router,
    public _userService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = localStorage.getItem('userDetails')
    if (user != null) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private _userService: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let currentUser = localStorage.getItem('userDetails')
    if (currentUser) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}