import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {ScheduleItem} from "./schedule-dto";

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private apiURL = 'http://localhost:8080/api/schedule/groups'
    constructor(private http: HttpClient) { }

    getScheduleByGroup(group_name: string | undefined): Observable<any> {
        return this.http.get<ScheduleItem[]>(`${this.apiURL}/${group_name}`);
    }
}
