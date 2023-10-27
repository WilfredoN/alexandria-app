import {Component, Injectable, OnInit} from '@angular/core';
import {UserDTO} from "../../login-panel/sign-up/user-dto";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
@Injectable({ providedIn: 'root' })
export class TeachersComponent implements OnInit {
    user: UserDTO | null = null;
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

}
