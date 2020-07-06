import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EssenComponent} from './components/essen/essen.component';
import {EssenDetailComponent} from './components/essen-detail/essen-detail.component';
import {AuthGuardService} from '../authentication/services/auth-guard.service';

const routes: Routes = [
  {path: 'essen', component: EssenComponent, canActivate: [AuthGuardService]},
  {path: 'essen/:id', component: EssenDetailComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EssenRoutingModule {
}
