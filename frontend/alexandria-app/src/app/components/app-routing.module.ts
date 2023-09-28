import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { LogInComponent } from './login-panel/log-in/log-in.component';
import { SingUpComponent } from './login-panel/sing-up/sing-up.component';
import { TasksComponent } from './base/tasks/tasks.component';
import { AdsComponent } from './base/ads/ads.component';
import { ScheduleComponent } from './base/schedule/schedule.component';
import { TeachersComponent } from './base/teachers/teachers.component';

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sing-up', component: SingUpComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'ads', component: AdsComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'teachers', component: TeachersComponent},

  {path: '**', redirectTo:"",component: BaseComponent}/*проверить, при перекиде сюда - смотреть входил ли в акк*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
