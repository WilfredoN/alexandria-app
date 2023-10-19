import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap, forkJoin} from 'rxjs';
import {UserDTO} from './user-dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    currentUser: UserDTO | null = null;
    private apiURL = 'http://localhost:8080/api/users';
    private apiGroupURL = 'http://localhost:8080/api/groups';

    constructor(private http: HttpClient) {
    }

    createUser(user: UserDTO): Observable<[any, UserDTO]> {
        const group = {
            group_name: `${user.prefix_group} - ${user.code_group}`
        };
        const createGroup = this.http.post(`${this.apiGroupURL}/create`,
            JSON.stringify(group), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        // Создаем Observable для запроса на создание пользователя
        const createUser = this.http.post<UserDTO>(`${this.apiURL}/create`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Возвращаем новый Observable, который испускает результаты обоих запросов
        return forkJoin([createGroup, createUser]);
    }


    logIn(user: UserDTO): Observable<UserDTO> {
        return this.http
            .post<UserDTO>(`${this.apiURL}/login`, user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .pipe(tap((user) => (this.currentUser = user)));
    }
}
