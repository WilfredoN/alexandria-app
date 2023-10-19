import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from './user-service';
import {UserDTO} from './user-dto';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
    myForm: FormGroup;
    subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English'];

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
            prefix_group: ['KI', Validators.required],
            code_group: ['', [Validators.required, Validators.pattern("[0-9]{3}")]],
            subjects: [''],
        });
    }


    onRoleChange(event: { value: string }) {
        if (event.value === 'Teacher') {
            this.myForm.controls.prefix_group.reset();
            this.myForm.controls.code_group.reset();
        } else {
            this.myForm.controls.subjects.reset();
        }
    }


    _formSubmit(): void {
        if (this.myForm.invalid) {
            this._snackBar.open('Ошибка валидации!', 'Закрыть', {duration: 3000});
            return;
        }

        const userDTO: UserDTO = {
            full_name: this.myForm.value.full_name,
            login: this.myForm.value.login,
            password: this.myForm.value.pwd,
            prefix_group: this.myForm.value.prefix_group,
            code_group: this.myForm.value.code_group,
            role: this.myForm.value.role,
        };

        this.userService.createUser(userDTO).subscribe({
            next: ( response) => {
                localStorage.setItem('user', JSON.stringify(response));
                this._snackBar.open('Регистрация успешна!', 'Закрыть', {duration: 3000});
                console.log('Регистрация прошла успешно - ', response);
                this.router.navigate(['base']).then(r => console.log(r));
            },
            error: (error) => {
                this._snackBar.open('Неправильно введены данные!', 'Закрыть', {duration: 3000});
                console.error('Ошибка регистрации - ', error);
            },
        });

    }
}
