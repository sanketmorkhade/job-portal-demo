import { Component } from "@angular/core";
import { LoginSignupService } from "./login-signup.service";
import { Router } from "@angular/router";
import { NotifyService } from './notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(  private loginSignup: LoginSignupService, private router: Router, private notifyService: NotifyService ) {
    this.subscription = this.notifyService.channel().subscribe(message => { this.checkLoginStatusFunc(); });
  }

  userObj: any;
  subscription: Subscription;

  ngOnInit() {
    this.checkLoginStatusFunc();
  }

  logoutFunc() {
    if(confirm("Are you sure, you want to logout ?")) {
      let reply = this.loginSignup.logoutUserFunc();
      reply.then(
        (iData: any) => {
          this.checkLoginStatusFunc();
          this.router.navigate(['login']);
        }
      )
    }
  }

  checkLoginStatusFunc() {
    let userStatus = this.loginSignup.loggedInUserDataFunc();
    if(userStatus) {
      this.userObj = JSON.parse(userStatus);
    }
    else {
      this.userObj = null;
    }
  }
  
}
