import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnalysisPage } from './analysis.page';
import { NgxGaugeModule } from 'ngx-gauge';

import {ProgressBarModule} from "angular-progress-bar"
import { DataService } from '../data.service';

const routes: Routes = [
  {
    path: '',
    component: AnalysisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxGaugeModule,
    ProgressBarModule

  ],schemas: [
    NO_ERRORS_SCHEMA,
    // CUSTOM_ELEMENTS_SCHEMA
  ],
  providers :[DataService],
  declarations: [AnalysisPage]
})
export class AnalysisPageModule {}
