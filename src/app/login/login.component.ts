import { Component, OnInit } from "@angular/core";
import { LoginSignupService } from "../login-signup.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private loginSignup: LoginSignupService, private router: Router) {}

  mode = "login";
  userType = localStorage.getItem("loginMode");

  ngOnInit() {}

  toggleFormFunc(iAction) {
    this.mode = iAction;
  }

  loginUserFunc(iForm) {
    if (iForm.invalid) {
      this.setErrorMsgFunc(iForm);
    } else {
      let finalData: any = iForm.value;
      finalData.user_type = this.userType;
      let reply = this.loginSignup.authenticateUserFunc(finalData);
      reply.then(
        (iData: any) => {
          alert(iData.msg);
          let currentUserData = {...finalData};
          delete currentUserData.password;
          localStorage.setItem('currentUserData', JSON.stringify(currentUserData));
          this.router.navigate(['jobs']);
        },
        (iError: any) => {
          alert(iError.msg.message);
        }
      );
    }
  }

  signupUserFunc(iForm) {
    console.log(iForm);
    if (iForm.invalid) {
      this.setErrorMsgFunc(iForm);
    } else {
      let { password, confirm_password } = iForm.value;
      if (password === confirm_password) {
        let finalData: any = iForm.value;
        finalData.user_type = this.userType;
        let reply = this.loginSignup.addNewUserFunc(finalData);
        reply.then(
          (iData: any) => {
            alert(iData.msg);
            this.toggleFormFunc("login");
          },
          (iError: any) => {
            alert(iError.msg.message);
          }
        );
      } else {
        alert("Password did not match.");
      }
    }
  }

  checkValidationFunc(iForm, iControl) {
    let control = iForm.controls[iControl];
    return control && (control.touched || control.dirty) && control.errors;
  }

  setErrorMsgFunc(iForm) {
    let controls = iForm.controls;
    for (let key in controls) {
      if (controls[key].invalid) {
        controls[key].markAsDirty();
      }
    }
  }

  backToHomeFunc() {
    this.router.navigate(['home']);
  }

}
