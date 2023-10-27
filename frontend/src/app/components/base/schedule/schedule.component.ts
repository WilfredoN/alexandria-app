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

    constructor(private scheduleService: ScheduleService) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        console.log(this.user);
        let groupName = this.user?.group_name;
        this.scheduleService.getScheduleByGroup(groupName).subscribe((data: ScheduleItem[]) => {
            this.schedule = data.sort((a, b) => {
                // Сначала сортируем по дням недели
                if (a.day_of_week > b.day_of_week) return -1;
                if (a.day_of_week < b.day_of_week) return 1;

                // Если дни недели одинаковые, сортируем по времени начала
                if (a.lessonId.start_time < b.lessonId.start_time) return -1;
                if (a.lessonId.start_time > b.lessonId.start_time) return 1;

                return 0;  // Если и дни недели, и время начала одинаковые
            });

            console.log(data);
        });

    }
}
