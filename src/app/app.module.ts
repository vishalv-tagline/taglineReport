import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaglineReportComponent } from './feature/tagline-report/tagline-report.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TaglineLeavereportComponent } from './feature/tagline-leavereport/tagline-leavereport.component';


@NgModule({
  declarations: [
    AppComponent,
    TaglineReportComponent,
    NavbarComponent,
    TaglineLeavereportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
