import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TeacherDTO} from "./teacher-dto";
import {StudentDTO} from "./student-dto";

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {
    }
    isStudentLocal: boolean;
    logIn(user: any) {
        console.log(user)
        if (!this.isStudentLocal) {
            return this.http.post<TeacherDTO>('http://localhost:8080/api/teachers/login', {
                "login": user.login,
                "password": user.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return this.http.post<StudentDTO>('http://localhost:8080/api/students/login', {
                "login": user.login,
                "password": user.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }


    register(user: any, isStudent: boolean) {
        if (!isStudent) {
            this.isStudentLocal = isStudent;
            return this.http.post<TeacherDTO>('http://localhost:8080/api/teachers/create', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            this.isStudentLocal = isStudent;
            return this.http.post<StudentDTO>('http://localhost:8080/api/students/create', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    delete(user: any) {
        if (!this.isStudentLocal) {
            return this.http.delete<TeacherDTO>('http://localhost:8080/api/teachers/' + user.login);
        } else {
            return this.http.delete<StudentDTO>('http://localhost:8080/api/students/' + user.login);
        }
    }

    update(login: string, password: string) {
        if (!this.isStudentLocal) {
            return this.http.put<TeacherDTO>('http://localhost:8080/api/teachers/' + login, {
                "password": password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return this.http.put<StudentDTO>('http://localhost:8080/api/students/' + login, {
                "password": password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }
}
