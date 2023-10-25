import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from './user-service';
import {UserDTO} from './user-dto';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

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
        private userService: UserService,
        private _snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this._formValidate();
        console.log(this.myForm.controls);
    }

    _formValidate() {
        this.myForm = this.fb.group({
            role: ['Student', Validators.required],
            full_name: ['', Validators.required],
            login: ['', Validators.required],
            pwd: ['', [Validators.required, Validators.minLength(6)]],
            prefix_group: ['', Validators.required],
            code_group: ['', Validators.required],
        });
    }


    onRoleChange(event: { value: string }) {
        console.log(this.myForm.controls)
        if (event.value === 'Teacher') {
            this.myForm.controls.prefix_group.reset();
            this.myForm.controls.prefix_group.disable();
            this.myForm.controls.code_group.disable();
            this.myForm.controls.code_group.reset();
        } else {
        }
    }


    _formSubmit(): void {
        if (this.myForm.controls.full_name.value.length < 5) {
            this._snackBar.open('Ваше ФИО должно быть больше 5 символов', 'Закрыть', {duration: 3000});
        }
        if (this.myForm.controls.login.value.length < 3) {
            this._snackBar.open('Логин должен быть больше 3 символов', 'Закрыть', {duration: 3000});
        }
        if (this.myForm.controls.pwd.value.length < 6) {
            this._snackBar.open('Пароль должен быть больше 6 символов', 'Закрыть', {duration: 3000});
        }
        if (this.myForm.controls.role.value === 'Student' && this.myForm.controls.prefix_group.value.length === 0) {
            this._snackBar.open('Префикс группы не может быть пустым', 'Закрыть', {duration: 3000});
        }
        if (this.myForm.controls.role.value === 'Student' && this.myForm.controls.code_group.value.length === 0) {
            this._snackBar.open('Код группы не может быть пустым', 'Закрыть', {duration: 3000});
        }

        const userDTO: UserDTO = {
            full_name: this.myForm.value.full_name,
            login: this.myForm.value.login,
            password: this.myForm.value.pwd,
            group_name: this.myForm.value.prefix_group + "-" + this.myForm.value.code_group,
        };
        const userDTO_teacher: UserDTO = {
            full_name: this.myForm.value.full_name,
            login: this.myForm.value.login,
            password: this.myForm.value.pwd,
        }
        if (this.myForm.value.role === 'Teacher') {
            this.handleResponse(this.userService.createTeacher(userDTO_teacher));
        } else {
            this.handleResponse(this.userService.createUser(userDTO));
        }
    }

    private handleResponse(response: Observable<UserDTO>) {
        response.subscribe({
            next: (response) => {
                localStorage.setItem('user', JSON.stringify(response));
                this._snackBar.open('Регистрация успешна!', 'Закрыть', {duration: 3000});
                console.log('Регистрация прошла успешно - ', response);
                this.router.navigate(['base']).then(r => console.log(r));
            },
            error: (error) => {
                console.error('Ошибка регистрации - ', error);
            },
        });
    }
}
