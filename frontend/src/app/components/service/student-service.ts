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
    getStudent(user: StudentDTO): Observable<StudentDTO> {
        this.user = user;
        console.log(this.user.login)
        return this.http.get<StudentDTO>('http://localhost:8080/api/students/' + this.user.login, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    getStudents(): Observable<StudentDTO[]> {
        return this.http.get<StudentDTO[]>('http://localhost:8080/api/students', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

