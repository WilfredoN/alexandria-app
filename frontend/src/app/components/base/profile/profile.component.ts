import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from './group-service';
import { Group } from './group.model';
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "../../service/auth-service";
import { loginDTO } from "../../service/login-dto";
import { DialogChangePasswordComponent } from "./dialog-change-password";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    isStudent: boolean;
    user: loginDTO;
    groups: Group[] = [];
    userDTO: any;

    constructor(
        private router: Router,
        private groupService: GroupService,
        public dialog: MatDialog,
        public authService: AuthService
    ) {}

    ngOnInit(): void {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            this.router.navigate(['/log-in']).then(r => console.log(r + '\nПереход на страницу входа'));
            return;
        }
        this.user = JSON.parse(storedUser);
        this.user.role = localStorage.getItem('role') as string;
        this.isStudent = this.user.role === 'student';
        if (!this.isStudent) {
            this.groupService.getGroups().subscribe((groups) => {
                this.groups = groups;
            });
        }
        this.authService.getUser(this.user).subscribe((userDTO: any) => {
            this.userDTO = userDTO;
            localStorage.setItem('user', JSON.stringify(userDTO));
            this.user = JSON.parse(localStorage.getItem('user') as string);
        });
        console.log(this.user);
    }

    openChangePasswordDialog() {
        const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
            data: { user: this.user, oldPassword: '', newPassword: '', newPassword_confirm: '' },
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // Обновите данные пользователя в localStorage
                this.user.password = result.user.newPassword;
                localStorage.setItem('user', JSON.stringify(this.user));
            }
        });
    }

    deleteAccount() {
        this.authService.delete(this.user).subscribe({
            next: () => {
                localStorage.removeItem('user');
                console.log(localStorage.getItem('user') === null ? 'Account deleted' : 'Account not deleted');
                this.router.navigate(['/log-in']).then(r => console.log(r + '\nПереход на страницу входа'));
            },
            error: (error) => {
                console.error('Ошибка при удалении аккаунта', error);
            }
        });
    }
}
