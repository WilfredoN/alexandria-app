import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDTO} from "./teacher-dto";
import {loginDTO} from "./login-dto";

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

    logIn(user: loginDTO) : Observable<loginDTO> {
        if (user.role === 'teacher') {
            return this.http.post<loginDTO>(`${this.baseUrl}/teachers/login`, user, this.httpOptions);
            }
        else {
            return this.http.post<loginDTO>(`${this.baseUrl}/students/login`, user, this.httpOptions);
        }
        }
    }
