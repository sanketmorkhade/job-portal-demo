import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupService } from './login-signup.service';
import { AuthenticateGuard } from './authenticate.guard';
import { NotifyService } from './notify.service';
import { UpdateJobService } from './update-job.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    AppRoutingModule
    ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [LoginSignupService, AuthenticateGuard, NotifyService, UpdateJobService]
})
export class AppModule { }
