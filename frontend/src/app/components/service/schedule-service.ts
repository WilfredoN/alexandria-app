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
        if (group_name === '') {
            return this.http.get<Schedule[]>(`${this.apiUrl}/KI-410`);
        }
        return this.http.get<Schedule[]>(`${this.apiUrl}/${group_name}`);
    }

    getLessonById(id: number): Observable<{ id: number, subject_name: string }> {
        const lessonUrl = `http://localhost:8080/api/subjects/${id}`;
        return this.http.get<{ id: number, subject_name: string}>(lessonUrl);
    }

    getTeacherById(id: number): Observable<{ id: number, full_name: string }> {
        const teacherUrl = `http://localhost:8080/api/teachers/${id}`;
        return this.http.get<{ id: number, full_name: string }>(teacherUrl);
    }
    createLesson(subject_name: string): Observable<{ id: number, subject_name: string }> {
        const lessonUrl = `http://localhost:8080/api/subjects`;
        return this.http.post<{ id: number, subject_name: string }>(`${lessonUrl}/create`, {subject_name});
    }
    updateSchedule(id: number, schedule: Schedule): Observable<Schedule> {
        const updateUrl = `http://localhost:8080/api/schedule/${id}`;
        return this.http.put<Schedule>(updateUrl, schedule);
    }
}
