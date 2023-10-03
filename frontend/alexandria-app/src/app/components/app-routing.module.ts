import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from './base/base.component';
import {LogInComponent} from './login-panel/log-in/log-in.component';
import {SignUpComponent} from './login-panel/sign-up/sign-up.component';
import {TasksComponent} from './base/tasks/tasks.component';
import {AdsComponent} from './base/ads/ads.component';
import {ScheduleComponent} from './base/schedule/schedule.component';
import {TeachersComponent} from './base/teachers/teachers.component';
import {ProfileComponent} from "./base/profile/profile.component";

const routes: Routes = [
	{ path: '', component: BaseComponent },
	{ path: 'log-in', component: LogInComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'tasks', component: TasksComponent },
	{ path: 'ads', component: AdsComponent },
	{ path: 'schedule', component: ScheduleComponent },
	{ path: 'teachers', component: TeachersComponent },
  {path: 'profile', component: ProfileComponent},

	{
		path: '**',
		redirectTo: '',
		component: BaseComponent,
	} /*проверить, при перекиде сюда - смотреть входил ли в акк*/,
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
