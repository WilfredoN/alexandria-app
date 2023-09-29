import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from 'src/app/components/base/base.component';
import { LogInComponent } from 'src/app/components/login-panel/log-in/log-in.component';
import { SignUpComponent } from 'src/app/components/login-panel/sign-up/sign-up.component';
import { TasksComponent } from 'src/app/components/base/tasks/tasks.component';
import { AnnouncementsComponent } from 'src/app/components/base/announcements/announcements.component';
import { ScheduleComponent } from 'src/app/components/base/schedule/schedule.component';
import { TeachersComponent } from 'src/app/components/base/teachers/teachers.component';
import { ProfileComponent } from './base/profile/profile.component';

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'announcements', component: AnnouncementsComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'teachers', component: TeachersComponent},
  {path: 'profile', component: ProfileComponent},

  {path: '**', redirectTo:"",component: BaseComponent}/*проверить, при перекиде сюда - смотреть входил ли в акк*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
