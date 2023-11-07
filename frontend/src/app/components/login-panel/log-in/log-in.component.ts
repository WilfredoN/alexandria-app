import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TeacherDTO} from "../../service/teacher-dto";
import {AuthService} from "../../service/auth-service";

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
        private authService: AuthService,
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
        const defaultDTO: TeacherDTO = {
            full_name: "",
            login: this.myForm.value.login,
            password: this.myForm.value.password,
        };
            this.authService.logIn(defaultDTO).subscribe({
                next: (response: any) => {
                    if (response) {
                        localStorage.setItem('user', JSON.stringify(response));
                        this.router.navigate(['/base']).then(r => console.log(r));
                    }
                },
                error: (error) => {
                    console.error('Ошибка при входе:', error);
                }
            });

    }

}
