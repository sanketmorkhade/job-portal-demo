import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobDetailViewComponent } from './job-detail-view/job-detail-view.component';

import { AuthenticateGuard } from './authenticate.guard';
import { OrderByPipe } from './order-by.pipe';
import { SearchPipe } from './search.pipe';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticateGuard] },
  { path: 'jobs', component: JobListingComponent, canActivate: [AuthenticateGuard] },
  { path: 'createJob', component: CreateJobComponent, canActivate: [AuthenticateGuard] },

  {path: '**', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [ HomePageComponent, LoginComponent, JobListingComponent, CreateJobComponent, OrderByPipe, JobDetailViewComponent, SearchPipe ],
  exports: [RouterModule]
})
export class AppRoutingModule { }