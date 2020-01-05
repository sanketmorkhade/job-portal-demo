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
  sortKey = "updated_on";
  ascendingOrder = false;

  ngOnInit() {
    this.currentUser = JSON.parse(this.loginSignup.loggedInUserDataFunc());
    this.fetchJobsFunc();
  }

  fetchJobsFunc() {
    let previousData = localStorage.getItem("postedJobs");
    if (previousData) {
      this.jobArr = JSON.parse(previousData);
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

  getClassFunc(iKey) {
    if(this.sortKey == iKey && !this.ascendingOrder) {
      return {"arrow-up": true}
    }
    else if(this.sortKey == iKey && this.ascendingOrder) {
      return {"arrow-down": true}
    }
    else {
      return {};
    }
  }
  
  orderByFunc(iEvent) {
    let key = this.getSortKeyFunc(iEvent);
    console.log(key);
    if(key) {
      this.ascendingOrder = (this.sortKey != key) ? true : !this.ascendingOrder;
      this.sortKey = iEvent.target.dataset.heading;

    }
  }

  getSortKeyFunc(iEvent) {
    const [a, b] = iEvent.path;
    if(a && a.tagName == "SPAN") {
      return b.dataset.heading;
    }
    else if(a) {
      return a.dataset.heading;
    }
    else {
      return null;
    }
  }
}
