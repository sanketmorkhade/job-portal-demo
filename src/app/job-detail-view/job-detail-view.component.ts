import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LoginSignupService } from "../login-signup.service";

@Component({
  selector: 'app-job-detail-view',
  templateUrl: './job-detail-view.component.html',
  styleUrls: ['./job-detail-view.component.css']
})
export class JobDetailViewComponent implements OnInit, OnChanges {

  constructor(private loginSignup: LoginSignupService) { }

  @Input() jobObj: any = {};
  @Output() callBackFunc = new EventEmitter();
  @Output() applyForJob = new EventEmitter();
  cardViewArr = [];
  currentUser: any = {};

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(this.loginSignup.loggedInUserDataFunc());
    this.createCardView();
  }

  closeDetialViewFunc() {
    this.callBackFunc.emit();
  }

  createCardView() {
    let obj = {
      job_title: "Job Title",
      company_name: "Company Name",
      location: "Location",
      state: "State",
      country: "Country",
      job_type: "Job Type",
      job_description: "Job Description",
      experience: "Experience Related Question",
      education: "Education"
    };
    this.cardViewArr = [];
    for (let key in this.jobObj) {
      let iObj: any = {};
      iObj.title = obj[key];
      iObj.type = typeof this.jobObj[key];
      iObj.value = this.jobObj[key];
      this.cardViewArr.push(iObj);
    }
  }

  applyForJobFunc() {
    this.applyForJob.emit(this.jobObj);
  }

  checkJobApplStatusFunc(iJob) {
    return iJob.applied_users.includes(this.currentUser.user_id);
  }

}