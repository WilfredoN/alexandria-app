import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDTO} from './teacher-dto';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    private apiURL = 'http://localhost:8080/api/teachers/group';


    constructor(private http: HttpClient) {
    }

    getTeachersForGroup(group_name: string | undefined): Observable<TeacherDTO[]> {
        // Execute an HTTP request to the backend
        return this.http.get<TeacherDTO[]>(`${this.apiURL}/${group_name}`);
    }

}
