import { Component, Injectable, OnInit } from '@angular/core';
import { UserDTO } from '../../login-panel/sign-up/user-dto';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
@Injectable({ providedIn: 'root' })
export class ProfileComponent implements OnInit {
    user: UserDTO | null = null;
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }
}
