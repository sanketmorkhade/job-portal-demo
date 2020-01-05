import { Component, OnInit } from "@angular/core";
import { LoginSignupService } from "../login-signup.service";
import { Router } from "@angular/router";
import { ngxCsv } from "ngx-csv/ngx-csv";
import { DatePipe } from '@angular/common';
import { UpdateJobService } from '../update-job.service';

@Component({
  selector: "app-job-listing",
  templateUrl: "./job-listing.component.html",
  styleUrls: ["./job-listing.component.css"],
  providers: [DatePipe]
})
export class JobListingComponent implements OnInit {
  constructor(
    private loginSignup: LoginSignupService,
    private router: Router,
    private datePipe: DatePipe,
    private updateJobService: UpdateJobService
  ) {}

  jobArr = new Array(20);
  currentUser: any = {};
  sortKey = "updated_on";
  ascendingOrder = false;
  showJobDetailFlag = false;
  viewJobObj: any = {};
  query = '';

  ngOnInit() {
    this.currentUser = JSON.parse(this.loginSignup.loggedInUserDataFunc());
    this.fetchJobsFunc();
  }

  fetchJobsFunc() {
    let previousData = localStorage.getItem("postedJobs");
    if (previousData) {
      this.jobArr = JSON.parse(previousData);
      this.sortKey = "updated_on";
      this.ascendingOrder = true;
      if(this.viewJobObj) {
        this.viewJobObj = this.jobArr.find(j => j.job_id == this.viewJobObj.job_id);
      }
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
    if (this.sortKey == iKey && !this.ascendingOrder) {
      return { "arrow-up": true };
    } else if (this.sortKey == iKey && this.ascendingOrder) {
      return { "arrow-down": true };
    } else {
      return {};
    }
  }

  orderByFunc(iEvent) {
    let key = this.getSortKeyFunc(iEvent);
    if (key) {
      this.ascendingOrder = this.sortKey != key ? true : !this.ascendingOrder;
      this.sortKey = iEvent.target.dataset.heading;
    }
  }

  getSortKeyFunc(iEvent) {
    const [a, b] = iEvent.path;
    if (a && a.tagName == "SPAN") {
      return b.dataset.heading;
    } else if (a) {
      return a.dataset.heading;
    } else {
      return null;
    }
  }

  showDetailFunc(iObj, iFlag) {
    this.viewJobObj = iObj;
    this.showJobDetailFlag = iFlag;
  }

  applyForJobFunc(iJob) {
    this.updateJobService.updateJobFunc(iJob, this.currentUser);
    this.fetchJobsFunc();
  }

  checkJobApplStatusFunc(iJob) {
    return iJob.applied_users.includes(this.currentUser.user_id);
  }

  exportJobFunc() {
    var options = {
      headers: ["Job Id", "Job Title", "Company Name", "Location", "State", "Country", "Job Type", "Job Description", "Eduction", "Posted On"]
    };
    let jobArr = [];
    let requiredKeys = ["job_id", "job_title", "company_name", "location", "state", "country", "job_type", "job_description", "education", "created_on"];
    for(let job of this.jobArr) {
      let obj: any = {};
      for(let key of requiredKeys) {
        let date = new Date(job[key]);
        if(date.toString() === 'Invalid Date' || key == 'job_id') {
          obj[key] = job[key];
        }
        else {
          obj[key] = this.datePipe.transform(new Date(job[key]), 'dd/MM/yyyy, hh:mm a');
        }
      }
      jobArr.push(obj);
    }
    new ngxCsv(jobArr, "My Posted Jobs", options);
  }
}
