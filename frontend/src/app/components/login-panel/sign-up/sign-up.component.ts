import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../service/auth-service';
import {Observable} from "rxjs";
import {TeacherDTO} from "../../service/teacher-dto";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
    myForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private _snackBar: MatSnackBar,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this._formValidate();
        console.log(this.myForm.controls);
    }

    _formValidate() {
        this.myForm = this.fb.group({
            full_name: ['', Validators.required],
            login: ['', Validators.required],
            pwd: ['', [Validators.required, Validators.minLength(6)],
            ],
        });
    }

    _formSubmit(): void {
        if (this.myForm.controls.full_name.value.length < 5) {
            this._snackBar.open('Full name should be more than 5 characters', 'Close', {duration: 3000});
            return;
        }
        if (this.myForm.controls.login.value.length < 3) {
            this._snackBar.open('Login should be more than 3 characters', 'Close', {duration: 3000});
            return;
        }
        if (this.myForm.controls.pwd.value.length < 6) {
            this._snackBar.open('Password should be more than 6 characters', 'Close', {duration: 3000});
            return;
        }
        const teacherDTO: TeacherDTO = {
            full_name: this.myForm.value.full_name,
            login: this.myForm.value.login,
            password: this.myForm.value.pwd,
        };
        this.handleResponse(this.authService.register(teacherDTO));
    }

    private handleResponse(response: Observable<any>) {
        response.subscribe({
            next: (response) => {
                localStorage.setItem('user', JSON.stringify(response));
                this._snackBar.open('Регистрация успешна!', 'Закрыть', {duration: 3000});
                console.log('Регистрация прошла успешно - ', response);
                this.router.navigate(['base']).then(r => console.log(r));
            },
            error: (error) => {
                this._snackBar.open('Ошибка регистрации', 'Закрыть', {duration: 3000});
                console.error('Ошибка регистрации - ', error);
            },
        });
    }
}
