import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfSampleComponent } from './components/pdf-sample/pdf-sample.component';
import { OnlineResumeBuilderComponent } from './components/online-resume-builder/online-resume-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PdfSampleComponent,
    OnlineResumeBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
