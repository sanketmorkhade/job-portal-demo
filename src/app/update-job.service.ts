import { Injectable } from '@angular/core';

@Injectable()
export class UpdateJobService {

  constructor() { }

  updateJobFunc(iJob, iUser) {
    let jobArr = this.fetchJobsFunc();
    let index = jobArr.findIndex(j => j.job_id == iJob.job_id);
    if(index != -1) {
      jobArr[index]['applied_count'] += 1;
      jobArr[index]['applied_users'].push(iUser.user_id);
      localStorage.setItem("postedJobs", JSON.stringify(jobArr));
    }
  }

  fetchJobsFunc() {
    let previousData = localStorage.getItem("postedJobs");
    let jobArr = [];
    if (previousData) {
      jobArr = JSON.parse(previousData);
    } else {
      jobArr = [];
    }
    return jobArr;
  }

}