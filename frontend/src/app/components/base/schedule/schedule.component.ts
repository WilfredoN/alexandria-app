import {Component, OnInit} from '@angular/core';
import {ScheduleService} from './schedule-service.component';
import {UserDTO} from "../../login-panel/sign-up/user-dto";
import {ScheduleItem} from "./schedule-dto";

@Component({
    selector: 'app-schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    schedule: ScheduleItem[] = [];
    user: UserDTO | null = null;

    constructor(private scheduleService: ScheduleService) { }

    ngOnInit(): void {
        // Получите группу из LocalStorage или другим способом
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        console.log(this.user);
        let groupName = this.user?.group_name;
        // Используйте ваш сервис для получения расписания по выбранной группе
        this.scheduleService.getScheduleByGroup(groupName).subscribe((data : ScheduleItem[]) => {
            this.schedule = data;
        });
    }
}
