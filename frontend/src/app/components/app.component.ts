import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
    user: any;
	title = 'alexandria-app';
	isShowHeader: boolean = true; // Флаг для показа/скрытия хедера
	constructor(private router: Router) {}

	ngOnInit() {
		// Подписываемся на события изменения маршрута
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				// Проверяем текущий маршрут
				this.isShowHeader = !(event.url === '/log-in' || event.url === '/sign-up');
			}
		});
	}
}
