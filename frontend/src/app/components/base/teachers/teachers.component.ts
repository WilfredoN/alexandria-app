import {Component, Injectable, OnInit} from '@angular/core';
import {UserDTO} from "../../login-panel/sign-up/user-dto";
import {TeacherDTO} from "./teacher-dto";
import {TeacherService} from "./teacher-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
@Injectable({ providedIn: 'root' })
export class TeachersComponent implements OnInit {
    user: UserDTO | null = null;
    teachers: TeacherDTO[] = [];
    constructor(private teacherService: TeacherService,
                private router: Router) { }
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        if (this.user == null) {
            this.router.navigate(['/log-in']).then(r => console.log(r));
        }
            this.getTeachersForGroup();
    }

    getTeachersForGroup() {
        this.teacherService.getTeachersForGroup(this.user?.group_name)
            .subscribe((teachers: TeacherDTO[]) => {
                this.teachers = teachers;
            });
    }
}
