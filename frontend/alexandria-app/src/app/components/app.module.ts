import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from "../../../../src/app/components/app.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent} from "../../../../src/app/components/header/header.component";
import { BaseComponent } from './base/base.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent} from "../../../../src/app/components/login-panel/sign-up/sign-up.component";
import { LogInComponent} from "../../../../src/app/components/login-panel/log-in/log-in.component";
import { TasksComponent } from './base/tasks/tasks.component';
import { ScheduleComponent} from "../../../../src/app/components/base/schedule/schedule.component";
import { AnnouncementsComponent } from './base/announcements/announcements.component';
import { TeachersComponent} from "../../../../src/app/components/base/teachers/teachers.component";
import { ProfileComponent } from './base/profile/profile.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		BaseComponent,
		SignUpComponent,
		LogInComponent,
		ScheduleComponent,
		AnnouncementsComponent,
		TeachersComponent,
		ProfileComponent,
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
		ReactiveFormsModule,
		MatTableModule,
    TasksComponent,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
