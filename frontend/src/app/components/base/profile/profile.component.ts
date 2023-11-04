import {Component, Injectable, OnInit} from '@angular/core';
import {UserDTO} from '../../login-panel/sign-up/user-dto';
import {Router} from '@angular/router';
import {GroupService} from './group-service';
import {Group} from './group.model';
import {DialogChangePasswordComponent} from "./dialog-change-password";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
@Injectable({providedIn: 'root'})
export class ProfileComponent implements OnInit {
    constructor(private router: Router, private groupService: GroupService,
                public dialog: MatDialog) {
    }

    user: UserDTO | null = null;
    groups: Group[] = [];
    password: string;

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        console.log(this.user);
        console.log(localStorage.getItem('role'));
        if (this.user && this.user.group_name === undefined) {
            this.groupService.getGroups().subscribe((groups) => {
                this.groups = groups;
            });
        }
    }

    openChangePasswordDialog() {
        const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
            data: { user: this.user, oldPassword: '', newPassword: '', newPassword_confirm: '' },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.user = result;
            }
        });
    }

}
