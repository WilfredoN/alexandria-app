import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Schedule} from "./schedule-dto";

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private apiUrl = 'http://localhost:8080/api/schedule/groups/KI-410';

    constructor(private http: HttpClient) {}

    getSchedules(): Observable<Schedule[]> {
        return this.http.get<Schedule[]>(this.apiUrl);
    }

    getLessonById(id: number): Observable<{ id: number, lesson_name: string }> {
        const lessonUrl = `http://localhost:8080/api/lessons/${id}`;
        return this.http.get<{ id: number, lesson_name: string}>(lessonUrl);
    }

    getTeacherById(id: number): Observable<{ id: number, full_name: string }> {
        const teacherUrl = `http://localhost:8080/api/teachers/${id}`;
        return this.http.get<{ id: number, full_name: string }>(teacherUrl);
    }
}
