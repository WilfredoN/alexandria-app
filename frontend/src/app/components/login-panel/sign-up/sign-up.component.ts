import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user-service';
import { UserDTO } from './user-dto';

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
		private userService: UserService
	) {}

	ngOnInit() {
		this._formValidate();
	}

	_formValidate() {
		this.myForm = this.fb.group({
			role: ['', Validators.required],
      pwd: [
				'',
				Validators.compose([Validators.required, Validators.minLength(6)]),
			],
			full_name: ['', Validators.required],
			login: ['', Validators.required],
			user_group: ['', Validators.required],
		});
	}

	_formSubmit(): void {
		if (this.myForm.invalid) {
			return;
		}

		// Отправка данных на сервер
		const userDTO: UserDTO = {
			full_name: this.myForm.value.full_name,
			login: this.myForm.value.login,
			password: this.myForm.value.pwd,
			user_group: this.myForm.value.user_group,
		};
		this.userService.createUser(userDTO).subscribe({
			next: (response) => {
				// Успешная регистрация
				console.log('User Registered - ', response);
				this.router.navigate(['base']).then(r => console.log(r));
			},
			error: (error) => {
				alert('Try to use another login!')
				console.error('Registration Failed - ', error);
			},
		});
	}
}
