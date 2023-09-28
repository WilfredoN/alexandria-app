import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-sing-up',
	templateUrl: './sing-up.component.html',
	styleUrls: ['./sing-up.component.css'],
})
export class SingUpComponent implements OnInit {
	title = 'Angular reactive forms custom validation';
	myForm: FormGroup;
	constructor(private fb: FormBuilder) {}
	_formValidate() {
		this.myForm = this.fb.group({
			email: [
				'',
				Validators.compose([
					Validators.required,
					Validators.email,
					Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
				]),
			],
			pwd: [
				'',
				Validators.compose([Validators.required, Validators.minLength(6)]),
			],
		});
	}
	ngOnInit() {
		this._formValidate();
	}
	_formSubmit(): void {
		if (this.myForm.invalid) {
			return;
		}
		alert('Success!' + JSON.stringify(this.myForm.getRawValue()));
	}
}
