import { Component } from "@angular/core";
import { LoginSignupService } from "./login-signup.service";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(  private loginSignup: LoginSignupService, private router: Router ) { }

  userStatus;

  ngOnInit() {
    this.checkLoginStatusFunc();
  }

  logoutFunc() {
    let reply = this.loginSignup.logoutUserFunc();
    reply.then(
      (iData: any) => {
        alert(iData.msg);
        this.checkLoginStatusFunc();
        this.router.navigate(['login']);
      }
    )
  }

  checkLoginStatusFunc() {
    this.userStatus = this.loginSignup.loggedInUserDataFunc();
  }
  
}
