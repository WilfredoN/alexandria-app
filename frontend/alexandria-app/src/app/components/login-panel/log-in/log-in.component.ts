import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})

export class LogInComponent {
  constructor(private router: Router) {}

  logIn() {
    // Здесь можно добавить логику выхода из аккаунта, например, очистку токена или данных сессии.
  
    // После выхода из аккаунта, перенаправляем пользователя на страницу входа.
    window.location.href = 'base';
  }
}
