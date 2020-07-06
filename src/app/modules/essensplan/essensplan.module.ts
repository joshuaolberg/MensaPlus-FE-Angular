import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EssensplanRoutingModule} from './essensplan-routing.module';
import {EssensplanComponent} from './components/essensplan/essensplan.component';
import {EssensplanDetailComponent} from './components/essensplan-detail/essensplan-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    EssensplanComponent,
    EssensplanDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EssensplanRoutingModule
  ]
})
export class EssensplanModule {
}
