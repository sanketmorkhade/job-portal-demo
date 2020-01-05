import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  mode = 'login';

  ngOnInit() {
  }

  toggleFormFunc(iForm) {
    this.mode = iForm;
  }

  loginUserFunc(iForm) {
    console.log(iForm)
    if(iForm.invalid) {
      this.setErrorMsgFunc(iForm);
    }
    else {
      
    }
  }

  signupUserFunc(iForm) {
    console.log(iForm);
    if(iForm.invalid) {
      this.setErrorMsgFunc(iForm);
    }
  }

  
  checkValidationFunc(iForm, iControl) {
    let control = iForm.controls[iControl];
    return (control && (control.touched || control.dirty) && control.errors);
  }

   setErrorMsgFunc(iForm) {
    let controls = iForm.controls;
    for (let key in controls) {
      if (controls[key].invalid) {
        controls[key].markAsDirty();
      }
    }
  }

}