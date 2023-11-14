import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDTO} from "./teacher-dto";

@Injectable({providedIn: 'root'})
export class TeacherService {
    constructor(private http: HttpClient) {
    }

    user: TeacherDTO;
    apiURL: string = 'http://localhost:8080/api/teachers';

    getTeacher(user : TeacherDTO): Observable<TeacherDTO> {
        this.user = user;
        return this.http.get<TeacherDTO>('http://localhost:8080/api/teachers/' + this.user.login, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

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

    getTeachersForGroup(groupName: string): Observable<TeacherDTO[]> {
        const url = `${this.apiURL}/groups/${groupName}`;
        return this.http.get<TeacherDTO[]>(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        }
    }

