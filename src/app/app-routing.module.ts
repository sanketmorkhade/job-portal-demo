import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { CreateJobComponent } from './create-job/create-job.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'jobs', component: JobListingComponent },
  { path: 'createJob', component: CreateJobComponent },

  {path: '**', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, ReactiveFormsModule ],
  declarations: [ HomePageComponent, LoginComponent, JobListingComponent, CreateJobComponent ],
  exports: [RouterModule]
})
export class AppRoutingModule { }