import { Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'alexandria-app';
  isShowHeader: boolean = true; // Флаг для показа/скрытия хедера

  constructor(private router: Router) {}

  ngOnInit() {
    // Подписываемся на события изменения маршрута
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Проверяем текущий маршрут
        if (event.url === '/log-in' || event.url === '/sing-up') {
          this.isShowHeader = false; // Если текущий маршрут - '/log-in', скрываем хедер
        } else {
          this.isShowHeader = true; // В противном случае показываем хедер
        }
      }
    });
  }

}
