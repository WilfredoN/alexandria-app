import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService} from "../../service/auth-service";
import {StudentDTO} from "../../service/student-dto";
import {TeacherDTO} from "../../service/teacher-dto";

export interface DialogData {
    user: StudentDTO | TeacherDTO
    oldPassword: string;
    newPassword: string;
    newPassword_confirm: string;
}

@Component({
    selector: 'dialog-change-password',
    templateUrl: 'dialog-change-password.html',
})
export class DialogChangePasswordComponent {
    /*isStudent : boolean;
    constructor(
        public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private _snackBar: MatSnackBar,
        private authService: AuthService,
    ) {}
    onNoClick(): void {
        this.dialogRef.close();
    }
    changePasswordDialog() {
        this.isStudent = localStorage.getItem('role') === 'Student';
        console.log(this.isStudent);
        if (
            this.data.newPassword === this.data.newPassword_confirm &&
            this.data.newPassword.length >= 6 &&
            this.data.newPassword !== this.data.oldPassword &&
            this.data.oldPassword === this.data.user.password
        ) {
            this.authService.update(this.data.user.login, this.data.newPassword)
                .subscribe({
                    next: response => {
                        console.log(response);
                        this.data.user.password = this.data.newPassword;
                        localStorage.setItem('user', JSON.stringify(this.data.user));
                        this._snackBar.open('Пароль успешно изменен', 'Закрыть', {duration: 3000});
                        this.dialogRef.close(this.data.user);
                    },
                    error: (error) => {
                        console.error('Ошибка при изменении пароля', error);
                        this._snackBar.open('Пароль не изменен', 'Закрыть', {duration: 3000});
                    }
                });
        } else {
            this._snackBar.open('Пароль не изменен', 'Закрыть', { duration: 3000 });
        }
    }*/
}
