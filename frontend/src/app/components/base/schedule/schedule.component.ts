import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "../../service/schedule-service";
import {Schedule} from "../../service/schedule-dto";
import {forkJoin, Observable} from "rxjs";

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    schedules: Schedule[] = [];
    currentDay: string;
    constructor(private scheduleService: ScheduleService) {
        this.currentDay = this.getCurrentDay();
    }

    ngOnInit(): void {
        this.scheduleService.getSchedules().subscribe(schedules => {
            this.schedules = schedules;

            const lessonRequests: Observable<{
                id: number,
                lesson_name: string,
            }>[] = schedules.map(schedule =>
                this.scheduleService.getLessonById(schedule.lessonId)
            );
            const teacherRequests: Observable<{ id: number, full_name: string }>[] = schedules.map(schedule =>
                this.scheduleService.getTeacherById(schedule.teacherId)
            );
            forkJoin(lessonRequests).subscribe(lessonNames => {
                lessonNames.forEach((lesson, index) => {
                    this.schedules[index].lessonName = lesson.lesson_name;
                    console.log(this.schedules[index].lessonName);
                });
            });

            forkJoin(teacherRequests).subscribe(teacherNames => {
                teacherNames.forEach((teacher, index) => {
                    this.schedules[index].teacherName = teacher.full_name;
                    console.log(this.schedules[index].teacherName);
                });
            });
            console.log(this.schedules);
            console.log(this.getDaysOfWeek());
        });

    }


    getDaysOfWeek(): string[] {
        return Array.from(new Set(this.schedules.map(schedule => schedule.dayOfWeek)));
    }

    getSchedulesForDayAndLesson(day: string, lessonNumber: number): Schedule[] {
        return this.schedules.filter(schedule => schedule.dayOfWeek === day && schedule.lessonNumber === lessonNumber);
    }

    isCurrentDay(day: string): boolean {
        return day === this.currentDay;
    }

    getCurrentDay(): string {
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        return daysOfWeek[currentDayIndex];
    }
}
