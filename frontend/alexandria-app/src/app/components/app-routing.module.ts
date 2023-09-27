import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { LogInComponent } from './login-panel/log-in/log-in.component';
import { SingUpComponent } from './login-panel/sing-up/sing-up.component';

const routes: Routes = [
  {path: '', component: BaseComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'sing-up', component: SingUpComponent},

  {path: '**', redirectTo:"",component: BaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
