import { Component, Injectable, OnInit } from '@angular/core';
import { UserDTO } from '../../login-panel/sign-up/user-dto';
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
@Injectable({ providedIn: 'root' })
export class ProfileComponent implements OnInit {
    constructor(private router: Router) {}
    user: UserDTO | null = null;
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        console.log(this.user);
        if (this.user == null) {
            this.router.navigate(['/log-in']).then(r => console.log(r));
        }
    }
}
