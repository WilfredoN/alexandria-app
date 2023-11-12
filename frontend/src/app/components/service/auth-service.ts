import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDTO} from "./teacher-dto";
import {loginDTO} from "./login-dto";
import {StudentDTO} from "./student-dto";

export interface LessonDTO {
    id: number;
    lesson_name: string;
}
export interface GroupDTO {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/api'; // Замените на ваш URL
    constructor(private http: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'accept': 'application/json',
            'content-type': 'application/json'
        })
    };

    register(user: TeacherDTO): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}/teachers/create`, user, this.httpOptions);
    }

    registerStudent(user: any): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}/students/create`, user, this.httpOptions);
    }

    getStudents(): Observable<StudentDTO[]> {
        return this.http.get<StudentDTO[]>(`${this.baseUrl}/students`);
    }
    getTeachers(): Observable<TeacherDTO[]> {
        return this.http.get<TeacherDTO[]>(`${this.baseUrl}/teachers`);
    }
    getLessons(): Observable<LessonDTO[]> {
        return this.http.get<LessonDTO[]>(`${this.baseUrl}/lessons`);
    }
    getGroups(): Observable<GroupDTO[]> {
        return this.http.get<GroupDTO[]>(`${this.baseUrl}/groups`);
    }
    createSchedule(lesson: any): Observable<any> {
        const schedule = {
            day_of_week: lesson.day_of_week,
            lesson_num: lesson.lesson_number,
            week_type: lesson.week_type,
            lesson_id: lesson.lesson_id,
            group_id: lesson.group_id.id,
            teacher_id: lesson.teacher_id.id
        }
        return this.http.post(`${this.baseUrl}/schedule/create`, schedule, this.httpOptions);
    }
    logIn(user: loginDTO): Observable<loginDTO> {
        const endpoint = user.role === 'teacher' ? '/teachers/login' : '/students/login';
        return this.http.post<loginDTO>(`${this.baseUrl}${endpoint}`, user, this.httpOptions);
    }

    delete(login: string, role: string): Observable<any> {
        const endpoint = role === 'teacher' ? '/teachers' : '/students';
        return this.http.delete<StudentDTO | TeacherDTO>(`${this.baseUrl}${endpoint}/${login}`, this.httpOptions);
    }

    getUser(user: any): Observable<any> {
        const endpoint = user.role === 'student' ? '/students' : '/teachers';
        const role = user.role === 'student' ? 'student' : 'teacher';
        localStorage.setItem('role', role);
        return this.http.get<StudentDTO | TeacherDTO>(`${this.baseUrl}${endpoint}/${user.id}`);
    }

    update(user: loginDTO, newPassword: string) {
        const endpoint = user.role === 'teacher' ? '/teachers' : '/students';
        const url = `${this.baseUrl}${endpoint}/${user.login}`;

        const headers = {
            'Content-Type': 'application/json',
        };

        return this.http.put<TeacherDTO | StudentDTO>(url, {"password": newPassword}, {headers});
    }

}
