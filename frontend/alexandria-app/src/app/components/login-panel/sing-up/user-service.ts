import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from './user-dto';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private apiURL = 'http://localhost:8080/api/users';
	constructor(private http: HttpClient) {}
	createUser(user: UserDTO): Observable<UserDTO> {
		return this.http.post<UserDTO>(`${this.apiURL}/create`, user);
	}
}
