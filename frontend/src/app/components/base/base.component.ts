import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.css'],
})
export class BaseComponent {
	isPanelExpanded: boolean = false;

	constructor(private router: Router) {}
	clickTasksRout() {
		this.router.navigate(['/tasks']);
	}

	clickScheduleRout() {
		this.router.navigate(['/schedule']);
	}

	clickAnnouncementsRout() {
		this.router.navigate(['/announcements']);
	}

	clickTeachersRout() {
		this.router.navigate(['/teachers']);
	}
}
