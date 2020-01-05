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
    let currentUser = this.loginSignup.loggedInUserDataFunc();
    if(currentUser){
      if(state && state.url && state.url == '/createJob') {
        let userObj = JSON.parse(currentUser);
        if(userObj.user_type == 1) {
          return true;
        }
        else {
          this.router.navigate(["jobs"]);
          return false;
        }
      }
      else if(state && state.url && state.url == "/login") {
        this.router.navigate(["jobs"]);
        return false;
      }
      else {
        return true;
      }
    }else{
      if(state && state.url && state.url != "/login") {
        this.router.navigate(["login"]);
        return false;
      }
      else {
        return true;
      }
    }
  }
}
