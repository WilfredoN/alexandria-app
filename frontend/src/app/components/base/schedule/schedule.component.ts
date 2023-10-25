import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from "../../login-panel/sign-up/user-dto";

@Component({
    selector: 'app-schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    daysOfWeek: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
    dataSource: any = {};
    user: UserDTO | null = null;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        const userGroup = this.user?.group_name;
        console.log(userGroup);
        this.http.get<Map<string, any>>(`http://localhost:8080/api/schedule/${userGroup}`).subscribe(data => {
            this.dataSource = data;
            console.log(this.dataSource);
        });

    }

    protected readonly Object = Object;
}
