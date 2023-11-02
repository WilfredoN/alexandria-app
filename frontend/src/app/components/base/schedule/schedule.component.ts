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
    //////// /////////////мое
    weekNumber: number = 1; // Инициализируем значение номера недели

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        console.log(this.user);
        let groupName = this.user?.group_name;
        // Используйте ваш сервис для получения расписания по выбранной группе
        this.scheduleService.getScheduleByGroup(groupName).subscribe((data : ScheduleItem[]) => {
            this.schedule = data;
        });
        // пофиксить //////////////////////////////////////
        const today = new Date();
        const dayOfWeek = today.getDay();

        if (dayOfWeek === 5) { // Если сегодня пятница
            const dayOfMonth = today.getDate();
            this.weekNumber = (dayOfMonth % 2 === 0) ? 2 : 1;
        }
    }


    isRedColor(dayIndex: number): boolean {
        const today = new Date().getDay();
        return (today === dayIndex + 1);
    }

    getColumnColor(dayIndex: number): object {
        const today = new Date().getDay();
        const color = (today === dayIndex + 1) ? 'red' : 'rgba(147, 147, 147, 1)';
        
        return { 'background-color': color};
    }

    //Пофиксить время пары, а то шото не то.
    getTimeSlotStyle(index: number): object {
        const now = new Date();

        const intervals = [
            { startTime: new Date('2023-11-01T08:00:00'), endTime: new Date('2023-11-01T12:00:00'), color: 'purple' },
            { startTime: new Date('2023-11-01T14:00:00'), endTime: new Date('2023-11-01T18:00:00'), color: 'purple' },
            { startTime: new Date('23:50:00'), endTime: new Date('01:00:00'), color: 'purple' },
        ];

        const currentInterval = intervals.find(interval => now >= interval.startTime && now <= interval.endTime);

        const color = currentInterval ? currentInterval.color : 'rgba(82, 135, 173, 1)';

        return { 'background-color': (index % 2 === 0) ? color : 'rgba(82, 135, 173, 1)' }; // применяем цвет к четным элементам
    }
}
