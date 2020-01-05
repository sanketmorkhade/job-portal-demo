import { Injectable } from "@angular/core";

@Injectable()
export class LoginSignupService {
  constructor() { }

  userTypeObj = { 1: "recruiterData", 2: "employeeData" };

  loggedInUserDataFunc() {
    return localStorage.getItem('currentUserData');
  }

  addNewUserFunc(iData) {
    let preData = localStorage.getItem(this.userTypeObj[iData.user_type]);
    if (preData) {
      let userDataObj: any = JSON.parse(preData);
      userDataObj[iData.user_id] = iData;
      localStorage.setItem(
        this.userTypeObj[iData.user_type],
        JSON.stringify(userDataObj)
      );
    } else {
      localStorage.setItem(
        this.userTypeObj[iData.user_type],
        JSON.stringify({ [iData.user_id]: iData })
      );
    }
    return new Promise((res, err) => { res({status: true, msg: 'User added successfully.'}) });
  }

  authenticateUserFunc(iData) {
    let preData = localStorage.getItem(this.userTypeObj[iData.user_type]);
    if (preData) {
      let userDataObj = JSON.parse(preData);
      if(userDataObj.hasOwnProperty(iData.user_id)) {
        if(userDataObj[iData.user_id]['password'] === iData.password) {
          return new Promise((res, err) => { res({status: true, msg: 'User authenticated successfully.'}) });
        }
        else {
          return new Promise((res, err) => { err({status: false, msg: new Error('Incorrect password.')}) });
        }
      }
      else {
        return new Promise((res, err) => { err({status: false, msg: new Error('User is not register.')}) });
      }
    }
    else {
      return new Promise((res, err) => { err({status: false, msg: new Error('User is not register.')}) });
    }
  }

  logoutUserFunc() {
    localStorage.removeItem('currentUserData');
    return new Promise((res, err) => res({status: true, msg: 'Your are successfully logout.'}))
  }

}
