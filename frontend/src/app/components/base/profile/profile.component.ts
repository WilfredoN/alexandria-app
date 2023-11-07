import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from './group-service';
import {Group} from './group.model';
import {DialogChangePasswordComponent} from "./dialog-change-password";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../service/auth-service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
@Injectable({providedIn: 'root'})
export class ProfileComponent implements OnInit {
    isStudent: boolean;

    constructor(private router: Router, private groupService: GroupService,
                public dialog: MatDialog,
                private authService: AuthService) {
    }

    user: any;
    groups: Group[] = [];
    password: string;

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        this.isStudent = "group_name" in this.user && this.user?.group_name !== undefined;
        console.log(this.user);
        console.log(this.isStudent);
        if (this.user && "group_name" in this.user && this.user?.group_name === undefined) {
            this.groupService.getGroups().subscribe((groups) => {
                this.groups = groups;
            });
        }
    }

    openChangePasswordDialog() {
        const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
            data: {user: this.user, oldPassword: '', newPassword: '', newPassword_confirm: ''},
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.user = result;
            }
        });
    }

   /* deleteAccount() {
        this.authService.delete(this.user).subscribe({
            next: response => {
                console.log(response);
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                this.router.navigate(['/log-in']).then(r => console.log(r));
            },
            error: (error) => {
                console.error('Ошибка при удалении аккаунта', error);
            }
        });
    }*/

}
