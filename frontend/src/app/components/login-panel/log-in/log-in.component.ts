import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../sign-up/user-service";
import {UserDTO} from "../sign-up/user-dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
    myForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this._formValidate();
    }

    _formValidate() {
        this.myForm = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    logIn(): void {
        if (this.myForm.invalid) {
            this._snackBar.open('Введите корректные данные', 'Закрыть', {duration: 3000});
            return;
        }

        const userDTO: UserDTO = {
            full_name: "", code_group: "", prefix_group: "", subjects: [],
            login: this.myForm.value.login,
            password: this.myForm.value.password,
            role: ""
        };

        this.userService.logIn(userDTO).subscribe({
            next: (response) => {
                localStorage.setItem('user', JSON.stringify(response));
                this.router.navigate(['base']).then(r => console.log(r));
                console.log('User Logged In - ', response);
                this._snackBar.open('Авторизация успешна!', 'Закрыть', {duration: 2000});
            },
            error: (error) => {
                this._snackBar.open(
                    'Неправильно введен логин или пароль!', 'Закрыть', {duration: 2000}
                );
                console.error('Login Failed - ', error);
            },
        });
    }
}
