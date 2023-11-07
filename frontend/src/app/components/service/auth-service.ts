import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherDTO } from "./teacher-dto";
import { loginDTO } from "./login-dto";
import { StudentDTO } from "./student-dto";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/api'; // Замените на ваш URL

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
            'accept': 'application/json',
            'content-type': 'application/json'
        })
    };

    register(user: TeacherDTO): Observable<Response> {
        return this.http.post<Response>(`${this.baseUrl}/teachers/create`, user, this.httpOptions);
    }

    logIn(user: loginDTO): Observable<loginDTO> {
        const endpoint = user.role === 'teacher' ? '/teachers/login' : '/students/login';
        return this.http.post<loginDTO>(`${this.baseUrl}${endpoint}`, user, this.httpOptions);
    }

    delete(user: loginDTO): Observable<any> {
        const endpoint = user.role === 'teacher' ? '/teachers' : '/students';
        return this.http.delete<StudentDTO | TeacherDTO>(`${this.baseUrl}${endpoint}/${user.login}`, this.httpOptions);
    }

    getUser(user: any): Observable<any> {
        const endpoint = user.role === 'student' ? '/students' : '/teachers';
        return this.http.get<StudentDTO | TeacherDTO>(`${this.baseUrl}${endpoint}/${user.login}`);
    }

    update(user: loginDTO, newPassword: string) {
        const endpoint = user.role === 'teacher' ? '/teachers' : '/students';
        return this.http.put<TeacherDTO | StudentDTO>(`${this.baseUrl}${endpoint}/${user.login}`,
            {
                "password": newPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    }
}
