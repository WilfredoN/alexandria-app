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
  subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English'];

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
      subjects: ['']
    });
  }

  onRoleChange(event: { value: string; }) {
    if (event.value === 'Teacher') {
      this.myForm.controls.user_group.reset();
    }
  }

  _formSubmit(): void {
    if (this.myForm.invalid) {
      return;
    }

    const userDTO: UserDTO = {
      full_name: this.myForm.value.full_name,
      login: this.myForm.value.login,
      password: this.myForm.value.pwd,
      user_group: this.myForm.value.user_group,
      subjects: this.myForm.value.subjects
    };

    this.userService.createUser(userDTO).subscribe({
      next: (response) => {
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
