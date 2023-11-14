import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Schedule} from "./schedule-dto";

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private apiUrl = 'http://localhost:8080/api/schedule/groups';

    constructor(private http: HttpClient) {}

    getSchedules(group_name: string): Observable<Schedule[]> {
        return this.http.get<Schedule[]>(`${this.apiUrl}/${group_name}`);
    }

    getLessonById(id: number): Observable<{ id: number, lesson_name: string }> {
        const lessonUrl = `http://localhost:8080/api/lessons/${id}`;
        return this.http.get<{ id: number, lesson_name: string}>(lessonUrl);
    }

    getTeacherById(id: number): Observable<{ id: number, full_name: string }> {
        const teacherUrl = `http://localhost:8080/api/teachers/${id}`;
        return this.http.get<{ id: number, full_name: string }>(teacherUrl);
    }
    createLesson(lesson_name: string): Observable<{ id: number, lesson_name: string }> {
        const lessonUrl = `http://localhost:8080/api/lessons`;
        return this.http.post<{ id: number, lesson_name: string }>(`${lessonUrl}/create`, {lesson_name});
    }
}
