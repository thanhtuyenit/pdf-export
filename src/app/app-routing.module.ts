import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlineResumeBuilderComponent } from './components/online-resume-builder/online-resume-builder.component';
import { PdfSampleComponent } from './components/pdf-sample/pdf-sample.component';

const routes: Routes = [
  {
    path: "test",
    component: PdfSampleComponent
  },
  {
    path: "resume",
    component: OnlineResumeBuilderComponent
  },
  {
    path: "",
    redirectTo: "resume",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "resume"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
