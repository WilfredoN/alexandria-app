import {Component, Injectable, OnInit} from '@angular/core';
import {UserDTO} from '../../login-panel/sign-up/user-dto';
import {Router} from "@angular/router";
import {GroupService} from "./group-service";
import {Group} from "./group.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
@Injectable({providedIn: 'root'})
export class ProfileComponent implements OnInit {
    constructor(private router: Router,
                private groupService: GroupService) {
    }

    user: UserDTO | null = null;
    groups: Group[] = [];

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        console.log(this.user);
        if (this.user == null) {
            this.router.navigate(['/log-in']).then(r => console.log(r));
        }
        if (this.user && this.user.group_name === undefined) {
            this.groupService.getGroups().subscribe((groups) => {
                this.groups = groups;
            });
        }
    }
}
