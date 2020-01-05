import { Component, OnInit } from "@angular/core";
import { LoginSignupService } from "../login-signup.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-job-listing",
  templateUrl: "./job-listing.component.html",
  styleUrls: ["./job-listing.component.css"]
})
export class JobListingComponent implements OnInit {
  constructor(private loginSignup: LoginSignupService, private router: Router) {}

  jobArr = new Array(20);
  currentUser: any = {};

  ngOnInit() {
    this.currentUser = JSON.parse(this.loginSignup.loggedInUserDataFunc());
    this.fetchJobsFunc();
  }

  fetchJobsFunc() {
    let previousData = localStorage.getItem("postedJobs");
    if (previousData) {
      this.jobArr = JSON.parse(previousData);
      this.jobArr = this.jobArr.sort((a, b) => {
        return a.updated_on > b.updated_on ? -1 : 1;
      });
    } else {
      this.jobArr = [];
    }
  }

  postJobFunc() {
    this.router.navigate(["/createJob"]);
  }

  editJobFunc(iJob) {
    localStorage.setItem("editJobObj", JSON.stringify(iJob));
    this.router.navigate(["/createJob"]);
  }

  deleteJobFunc(iIndex) {
    if (confirm("Are you sure, you want to delete job ?")) {
      let previousData = localStorage.getItem("postedJobs");
      if (previousData) {
        let postedJobsArr = JSON.parse(previousData);
        postedJobsArr.splice(iIndex, 1);
        localStorage.setItem("postedJobs", JSON.stringify(postedJobsArr));
      }
      this.fetchJobsFunc();
    }
  }
}
