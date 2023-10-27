import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserDTO } from './user-dto';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	currentUser: UserDTO | null = null;
	private apiURL = 'http://localhost:8080/api/users';
	constructor(private http: HttpClient) {}

	createUser(user: UserDTO): Observable<UserDTO> {
		return this.http.post<UserDTO>(`${this.apiURL}/create`, user, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
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
