import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaglineLeavereportComponent } from './feature/tagline-leavereport/tagline-leavereport.component';
import { TaglineReportComponent } from './feature/tagline-report/tagline-report.component';

const routes: Routes = [
  {
    path: '',
    component: TaglineReportComponent
  },
  {
    path: 'taglineLeaveReport',
    component: TaglineLeavereportComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
