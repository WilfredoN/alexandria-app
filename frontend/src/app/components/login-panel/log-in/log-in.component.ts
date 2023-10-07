import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from "../sign-up/user-service";
import { UserDTO} from "../sign-up/user-dto";

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
    private userService: UserService
  ) {}

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
      return;
    }

    const userDTO: UserDTO = {
      full_name: "", user_group: "",
      login: this.myForm.value.login,
      password: this.myForm.value.password
    };

    this.userService.logIn(userDTO).subscribe({
      next: (response) => {
        this.router.navigate(['base']).then(r => console.log(r));
        console.log('User Logged In - ', response);
      },
      error: (error) => {
        alert('Incorrect login or password!')
        console.error('Login Failed - ', error);
      },
    });
  }
}
