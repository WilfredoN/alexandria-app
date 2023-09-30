import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base/base.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingUpComponent } from './login-panel/sing-up/sing-up.component';
import { LogInComponent } from './login-panel/log-in/log-in.component';
import { TasksComponent } from './base/tasks/tasks.component';
import { ScheduleComponent } from './base/schedule/schedule.component';
import { AdsComponent } from './base/ads/ads.component';
import { TeachersComponent } from './base/teachers/teachers.component';
import { ProfileComponent } from './base/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BaseComponent,
    SingUpComponent,
    LogInComponent,
    TasksComponent,
    ScheduleComponent,
    AdsComponent,
    TeachersComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
