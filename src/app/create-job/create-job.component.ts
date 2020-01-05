import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-job",
  templateUrl: "./create-job.component.html",
  styleUrls: ["./create-job.component.css"]
})
export class CreateJobComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}

  jobPostForm: FormGroup;
  sliderIndex = 0;
  jobTypeArr = [
    "Full-time",
    "Part-time",
    "Temporary",
    "Contract",
    "Internship",
    "Commission"
  ];
  educationArr = [
    "None",
    "Secondary(10th Pass)",
    "Higher Secondary(12th Pass)",
    "Diploma",
    "Bachelor's",
    "Master's",
    "Doctorate",
    "Other"
  ];
  formGroupObj: any = {
    0: "companyDetails",
    1: "jobDetails",
    2: "experienceDetails",
    3: null
  };
  cardViewArr = [];
  action = "add";
  jobArr = [];
  titleError = '';
  editJobObj: any = {};

  ngOnInit() {
    this.fetchJobsFunc();
    this.postNewJobFunc();
    let editData = this.getLSDataFunc();
    if (editData) {
      this.action = "edit";
      this.editJobObj = JSON.parse(editData);
      this.editJobFunc(this.editJobObj);
    }
  }

  getLSDataFunc() {
    return localStorage.getItem("editJobObj");
  }

  postNewJobFunc() {
    this.jobPostForm = this.fb.group({
      companyDetails: this.fb.group({
        job_title: [{ value: "", disabled: false }, [Validators.required, this.ValidateTitle]],
        company_name: [{ value: "", disabled: false }, Validators.required],
        location: [{ value: "", disabled: false }, Validators.required],
        state: [{ value: "", disabled: false }, Validators.required],
        country: [{ value: "", disabled: false }, Validators.required]
      }),
      jobDetails: this.fb.group({
        job_type: [{ value: this.jobTypeArr[0], disabled: true }],
        job_description: [{ value: "", disabled: true }]
      }),
      experienceDetails: this.fb.group({
        experience: this.fb.array([]),
        education: [
          { value: this.educationArr[0], disabled: true },
          Validators.required
        ]
      })
    });
  }

  editJobFunc(iData) {
    this.jobPostForm.setValue({
      companyDetails: {
        job_title: iData.job_title,
        company_name: iData.company_name,
        location: iData.location,
        state: iData.state,
        country: iData.country
      },
      jobDetails: {
        job_type: iData.job_type,
        job_description: iData.job_description
      },
      experienceDetails: {
        experience: iData.experience,
        education: iData.education
      }
    }); 
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: [
        { value: "", disabled: this.sliderIndex === 2 ? false : true },
        Validators.required
      ],
      answer: ""
    });
  }

  
  ValidateTitle = (control: AbstractControl) => {
    if(this.jobArr && this.jobArr.length){
      let titleAlreadyExistFlag = this.jobArr.some(j => {
        return j.job_id != this.editJobObj.job_id &&j.job_title.toString().toLowerCase() == control.value.toString().toLowerCase()
      });
      if (titleAlreadyExistFlag) {
        return { validTitle: true };
      }
    }
    return null;
  }

  getErrorMsgForTitleFunc(iGroup, iControl) {
    let control = this.jobPostForm.get(iGroup).get(iControl);
    if(control && control.errors) {
      return control.errors.required ? "Please provide valid job title." : control.errors.validTitle ? "Job title with same name already exist." : '';
    }
    return '';
  }

  fetchJobsFunc() {
    let previousData = localStorage.getItem("postedJobs");
    if (previousData) {
      this.jobArr = JSON.parse(previousData);
    } else {
      this.jobArr = [];
    }
  }

  slideFunc(iIndex) {
    let canSlide = false;
    if (iIndex == 1) {
      if (this.sliderIndex == 0) {
        canSlide = this.validStatusFunc("companyDetails");
        this.setErrorMsgFunc("companyDetails");
      } else if (this.sliderIndex == 1) {
        canSlide = this.validStatusFunc("jobDetails");
        this.setErrorMsgFunc("jobDetails");
      } else if (this.sliderIndex == 2) {
        canSlide = this.validStatusFunc("experienceDetails");
        this.setErrorMsgFunc("experienceDetails");
        this.createCardView();
      } else if (this.sliderIndex == 3) {
        let finalData = { ...this.jobPostForm.value };
        if(this.action == 'add'){
          this.postJobFunc(finalData);
        }
        else {
          this.updateJobFunc(finalData);
        }
      }
    } else canSlide = true;
    if (canSlide) {
      this.toggleControlFunc(this.formGroupObj[this.sliderIndex], false);
      this.sliderIndex += iIndex;
      this.toggleControlFunc(this.formGroupObj[this.sliderIndex], true);
    }
  }

  toggleControlFunc(iGroup, iFlag) {
    if (!iGroup) return;
    let group: any = this.jobPostForm.get(iGroup);
    for (let key in group.controls) {
      group.controls[key][iFlag ? "enable" : "disable"]();
    }
  }

  validStatusFunc(iGroup) {
    if (
      this.jobPostForm &&
      this.jobPostForm.controls &&
      this.jobPostForm.controls.hasOwnProperty(iGroup)
    ) {
      return this.jobPostForm.controls[iGroup].valid;
    }
  }

  checkValidationFunc(iGroup, iControl) {
    let control = this.jobPostForm.get(iGroup).get(iControl);
    return (control.touched || control.dirty) && control.errors;
  }

  setErrorMsgFunc(iGroup) {
    let group: any = this.jobPostForm.get(iGroup);
    for (let key in group.controls) {
      if (group.controls[key].invalid) {
        group.controls[key].markAsDirty();
      }
    }
  }

  addQuestionFunc() {
    let items = this.jobPostForm
      .get("experienceDetails")
      .get("experience") as FormArray;
    items.push(this.createQuestion());
  }

  removeQuestionFunc(iIndex) {
    let items = this.jobPostForm
      .get("experienceDetails")
      .get("experience") as FormArray;
    items.removeAt(iIndex);
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
    let finalJobObj: any = { ...this.jobPostForm.controls };
    for (let key in finalJobObj) {
      for (let key1 in finalJobObj[key].value) {
        let iObj: any = {};
        iObj.title = obj[key1];
        iObj.type = typeof finalJobObj[key]["value"][key1];
        iObj.value = finalJobObj[key]["value"][key1];
        this.cardViewArr.push(iObj);
      }
    }
  }

  formatDataFunc(iData) {
    let iObj: any = {};
    for (let key in iData) {
      for (let key1 in iData[key]) {
        iObj[key1] = iData[key][key1];
      }
    }
    return iObj;
  }

  postJobFunc(iData) {
    let finalData = this.formatDataFunc(iData);
    finalData.created_on = new Date().toISOString();
    finalData.updated_on = new Date().toISOString();
    finalData.applied_count = 0;
    finalData.applied_users = [];
    finalData.job_id = new Date().getTime();
    let previousData = localStorage.getItem("postedJobs");
    if (previousData) {
      let postedJobsArr = JSON.parse(previousData);
      postedJobsArr.push(finalData);
      localStorage.setItem("postedJobs", JSON.stringify(postedJobsArr));
    } else {
      let postedJobsArr = [finalData];
      localStorage.setItem("postedJobs", JSON.stringify(postedJobsArr));
    }
    this.closeAddWindowFunc();
  }

  updateJobFunc(iData) {
    let newDataObj = this.formatDataFunc(iData);
    let backupData = this.getLSDataFunc();
    if (backupData) {
      let backupJobObj = JSON.parse(backupData);
      let isValueChange = this.compareDataFunc(backupJobObj, newDataObj);
      if (isValueChange) {
        newDataObj.job_id = backupJobObj.job_id;
        newDataObj.created_on = backupJobObj.created_on;
        newDataObj.updated_on = new Date().toISOString();
        newDataObj.applied_count = backupJobObj.applied_count;
        newDataObj.applied_users = backupJobObj.applied_users;
        let jobArr = [];
        let previousData = localStorage.getItem("postedJobs");
        if (previousData) {
          jobArr = JSON.parse(previousData);
        }
        let index = jobArr.findIndex(j => j.job_id == newDataObj.job_id);
        jobArr[index] = newDataObj;
        localStorage.setItem("postedJobs", JSON.stringify(jobArr));
        this.closeAddWindowFunc();
      }
    }
  }

  compareDataFunc(iPreData, iNewData) {
    let keyArr = [
      "job_title",
      "company_name",
      "location",
      "state",
      "country",
      "job_type",
      "job_description",
      "experience",
      "education"
    ];
    for (let key of keyArr) {
      if (iPreData[key] !== iNewData[key]) {
        return true;
      }
    }
    return false;
  }

  closeAddWindowFunc() {
    this.router.navigate(["/jobs"]);
  }

  ngOnDestroy() {
    localStorage.removeItem("editJobObj");
  }
}