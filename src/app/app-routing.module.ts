import { NgModule } from '@angular/core';
import { Routes, RouterModule , Resolve } from '@angular/router';
import { TimesheetPageComponent } from './component/timesheet-page/timesheet-page.component';
import { UserprofilePageComponent } from './component/userprofile-page/userprofile-page.component';
import { UserlistPageComponent } from './component/userlist-page/userlist-page.component';
import { from } from 'rxjs';

//resolver Block

import { UserAnagraphicResolverService } from '@app/services/user-anagraphic-resolver.service';
import { UserListResolverService } from '@app/services/user-list-resolver.service';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { TimesheetResolverService } from './services/timesheet-resolver.service';
import { AuthGuard } from './_helper/auth.guard';
import { UserDetailPageComponent } from './component/user-detail-page/user-detail-page.component';


const routes: Routes = [
  { path: '', component: TimesheetPageComponent, canActivate: [AuthGuard]},
  { path: 'login-page', component: LoginPageComponent  },
  { path: 'timesheet-page', component: TimesheetPageComponent,  canActivate: [AuthGuard]  },
  { path: 'userprofile', component: UserprofilePageComponent , resolve: { user: UserAnagraphicResolverService }, canActivate: [AuthGuard] },
  { path: 'userlist', component: UserlistPageComponent , resolve: { userlist: UserListResolverService }, canActivate: [AuthGuard]},
  {
    path: 'detail/:id',
    component: UserDetailPageComponent,
    resolve: {
      hero: TimesheetResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
