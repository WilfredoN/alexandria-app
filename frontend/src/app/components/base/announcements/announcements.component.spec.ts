import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsComponent } from './announcements.component';

describe('AdsComponent', () => {
	let component: AnnouncementsComponent;
	let fixture: ComponentFixture<AnnouncementsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AnnouncementsComponent],
		});
		fixture = TestBed.createComponent(AnnouncementsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
