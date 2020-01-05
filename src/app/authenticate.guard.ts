import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSignupService } from "./login-signup.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticateGuard implements CanActivate {

  constructor(private loginSignup: LoginSignupService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.loginSignup.isUserLoggedInFunc()){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
  }
}
