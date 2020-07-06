import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EssenRoutingModule} from './essen-routing.module';
import {EssenComponent} from './components/essen/essen.component';
import {EssenDetailComponent} from './components/essen-detail/essen-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    EssenComponent,
    EssenDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EssenRoutingModule,
  ],
})
export class EssenModule {
}
