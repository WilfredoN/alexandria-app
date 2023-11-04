import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {UserDTO} from './user-dto';
import {TeacherDTO} from '../../base/teachers/teacher-dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    currentUser: UserDTO | TeacherDTO | null = null;
    private apiURL = 'http://localhost:8080/api/students';
    private teacher_apiURL = 'http://localhost:8080/api/teachers';
    private url = localStorage.getItem('role') === 'Student' ? this.apiURL : this.teacher_apiURL;
    constructor(private http: HttpClient) {
    }

    createUser(user: UserDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(`${this.url}/create`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    createTeacher(user: TeacherDTO): Observable<UserDTO> {
        return this.http.post<UserDTO>(`${this.url}/create`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    logIn(user: UserDTO): Observable<UserDTO> {
        return this.http
            .post<UserDTO>(`${this.url}/login`, user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .pipe(tap((user) => (this.currentUser = user)));
    }
    changePassword(login: string, newPassword: string): Observable<UserDTO> {

        return this.http.put<UserDTO>(`${this.url}/by-login/${login}`,
            {
                "password": newPassword,
            }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }



}
