import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Group} from "./group.model";

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    private baseUrl = 'http://localhost:8080/api/groups';

    constructor(private http: HttpClient) {
    }

    getGroups(): Observable<Group[]> {
        return this.http.get<Group[]>(`${this.baseUrl}`);
    }

    assignGroupsToTeacher(teacherId: number, groupIds: number[]): Observable<{ teacherId: number, groups: number[] }> {
        return this.http.post<{ teacherId: number, groups: number[] }>(`${this.baseUrl}/assign/${teacherId}`, groupIds);
    }
}
