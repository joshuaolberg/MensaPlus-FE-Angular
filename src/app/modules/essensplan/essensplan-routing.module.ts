import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EssensplanComponent} from './components/essensplan/essensplan.component';
import {EssensplanDetailComponent} from './components/essensplan-detail/essensplan-detail.component';
import {AuthGuardService} from '../authentication/services/auth-guard.service';


const routes: Routes = [
  {path: 'mensaplan', component: EssensplanComponent, canActivate: [AuthGuardService]},
  {path: 'mensaplan/:id', component: EssensplanDetailComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EssensplanRoutingModule {
}
