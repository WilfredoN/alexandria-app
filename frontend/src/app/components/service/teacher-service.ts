import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDTO} from "./teacher-dto";

@Injectable({providedIn: 'root'})
export class TeacherService {
    constructor(private http: HttpClient) {
    }
    user: TeacherDTO;
    findByLogin(login : string) {
        return this.http.get('http://localhost:8080/api/teachers/' + login);
    }
    /*createTeacher(teacher: TeacherDTO): Observable<TeacherDTO> {
        return this.http.post<TeacherDTO>('http://localhost:8080/api/teachers/create', teacher, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }*/
    /*logIn(login: string, password: string): Observable<TeacherDTO> {
        return this.http.post<TeacherDTO>('http://localhost:8080/api/teachers/login',
            {
                "login": login,
                "password": password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    }*/
    updateTeacher(teacher: TeacherDTO, password: string): Observable<TeacherDTO> {
        return this.http.put<TeacherDTO>(`http://localhost:8080/api/teachers/${teacher.login}`,
            {
                "password": password,
            }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    deleteTeacher(login: string): Observable<TeacherDTO> {
        return this.http.delete<TeacherDTO>(`http://localhost:8080/api/teachers/${login}`);
    }
}

