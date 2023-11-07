import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentDTO} from "./student-dto";

@Injectable({providedIn: 'root'})
export class StudentService {
    constructor(private http: HttpClient) {
    }
    user: StudentDTO;
    findByLogin(login : string) {
        return this.http.get('http://localhost:8080/api/students/' + login);
    }
    /*createStudent(student: StudentDTO): Observable<StudentDTO> {
        return this.http.post<StudentDTO>('http://localhost:8080/api/students/create', student, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }*/
    /*logIn(login: string, password: string): Observable<StudentDTO> {
        return this.http.post<StudentDTO>('http://localhost:8080/api/students/login',
            {
                "login": login,
                "password": password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    }*/
    updateStudent(student: StudentDTO, password: string): Observable<StudentDTO> {
        return this.http.put<StudentDTO>(`http://localhost:8080/api/students/${student.login}`,
            {
                "password": password,
            }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    deleteStudent(login: string): Observable<StudentDTO> {
        return this.http.delete<StudentDTO>(`http://localhost:8080/api/students/${login}`);
    }
}

